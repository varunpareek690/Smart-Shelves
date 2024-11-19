import sys
import joblib
import json

# Load the model
model = joblib.load("smart_shelf_model.pkl")

# Parse inputs
weight = float(sys.argv[1])
distance = int(sys.argv[2])
daily_usage_rate = float(sys.argv[3])

# Predict
prediction = model.predict([[weight, distance, daily_usage_rate]])[0]

# Return result
print(json.dumps({"prediction": int(prediction)}))
