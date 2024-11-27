import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import IsolationForest
from sklearn.cluster import KMeans
import joblib
import datetime

class SmartShelfSensorAnalyzer:
    def __init__(self):
        """
        Initialize sensor data analysis tools
        
        Key Objectives:
        1. Anomaly Detection
        2. Product Categorization
        3. Inventory State Prediction
        """
        self.anomaly_detector = IsolationForest(
            contamination=0.1,  # Assume 10% of data might be anomalous
            random_state=42
        )
        self.cluster_classifier = KMeans(
            n_clusters=3,  # 3 inventory states: Low, Medium, High
            random_state=42
        )
        self.scaler = StandardScaler()

    def preprocess_sensor_data(self, sensor_data):
        """
        Preprocess raw sensor data
        
        Expected Input:
        {
            'load_cell_value': float,
            'ultrasonic_sensor1': float,
            'ultrasonic_sensor2': float,
            'ir_sensor1': bool,
            'ir_sensor2': bool,
            'ir_sensor3': bool,
            'timestamp': datetime
        }
        """
        # Extract features
        features = [
            sensor_data['load_cell_value'],
            sensor_data['ultrasonic_sensor1'],
            sensor_data['ultrasonic_sensor2'],
            int(sensor_data['ir_sensor1']),
            int(sensor_data['ir_sensor2']),
            int(sensor_data['ir_sensor3']),
            sensor_data['timestamp'].hour,
            sensor_data['timestamp'].weekday()
        ]
        
        return np.array(features).reshape(1, -1)

    def detect_anomalies(self, processed_data):
        """
        Detect unusual inventory patterns
        
        Returns:
        - Is Anomaly (Boolean)
        - Anomaly Score
        """
        # Fit and predict if not already fitted
        if not hasattr(self.anomaly_detector, 'fit'):
            self.anomaly_detector.fit(processed_data)
        
        anomaly_scores = self.anomaly_detector.score_samples(processed_data)
        is_anomaly = self.anomaly_detector.predict(processed_data) == -1
        
        return {
            'is_anomaly': bool(is_anomaly[0]),
            'anomaly_score': anomaly_scores[0]
        }

    def classify_inventory_state(self, processed_data):
        """
        Classify current inventory state
        
        Inventory States:
        0: Low Stock
        1: Medium Stock
        2: High Stock
        """
        # Ensure data is scaled
        scaled_data = self.scaler.fit_transform(processed_data)
        
        # Fit and predict cluster
        if not hasattr(self.cluster_classifier, 'fit'):
            self.cluster_classifier.fit(scaled_data)
        
        inventory_cluster = self.cluster_classifier.predict(scaled_data)[0]
        
        inventory_states = {
            0: 'LOW_STOCK',
            1: 'MEDIUM_STOCK',
            2: 'HIGH_STOCK'
        }
        
        return inventory_states[inventory_cluster]

    def predict_restocking_likelihood(self, processed_data):
        """
        Calculate probability of needing restocking
        
        Returns restocking recommendation
        """
        anomaly_result = self.detect_anomalies(processed_data)
        inventory_state = self.classify_inventory_state(processed_data)
        
        # Restocking logic
        restocking_likelihood = {
            'LOW_STOCK': {
                'restock_soon': True,
                'priority': 'HIGH',
                'recommended_action': 'IMMEDIATE_RESTOCK'
            },
            'MEDIUM_STOCK': {
                'restock_soon': anomaly_result['is_anomaly'],
                'priority': 'MEDIUM',
                'recommended_action': 'MONITOR_CLOSELY'
            },
            'HIGH_STOCK': {
                'restock_soon': False,
                'priority': 'LOW',
                'recommended_action': 'NO_ACTION_REQUIRED'
            }
        }
        
        return {
            **restocking_likelihood[inventory_state],
            'anomaly_details': anomaly_result
        }

    def process_sensor_stream(self, sensor_data_stream):
        """
        Process a stream of sensor data
        
        Generates insights and tracks changes
        """
        results = []
        for sensor_data in sensor_data_stream:
            processed_data = self.preprocess_sensor_data(sensor_data)
            
            analysis = {
                'timestamp': sensor_data['timestamp'],
                'anomaly_detection': self.detect_anomalies(processed_data),
                'inventory_state': self.classify_inventory_state(processed_data),
                'restocking_recommendation': self.predict_restocking_likelihood(processed_data)
            }
            
            results.append(analysis)
        
        return results

    def save_model(self, filepath='smart_shelf_model.joblib'):
        """Save trained models and scalers"""
        joblib.dump({
            'anomaly_detector': self.anomaly_detector,
            'cluster_classifier': self.cluster_classifier,
            'scaler': self.scaler
        }, filepath)

    def load_model(self, filepath='smart_shelf_model.joblib'):
        """Load pre-trained models and scalers"""
        saved_data = joblib.load(filepath)
        self.anomaly_detector = saved_data['anomaly_detector']
        self.cluster_classifier = saved_data['cluster_classifier']
        self.scaler = saved_data['scaler']