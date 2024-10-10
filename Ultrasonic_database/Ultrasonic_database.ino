#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#define TRIG_PIN D1
#define ECHO_PIN D2

// Wi-Fi credentials
const char* ssid = "realme C3";
const char* password = "biia73pr";

// Server URL - replace with your local machine's IP and port
const String serverUrl = "http://192.168.48.137:3000/api/sensor-data";

// Create a WiFiClient object
WiFiClient client;

long readDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  
  long duration = pulseIn(ECHO_PIN, HIGH);
  long distance = (duration * 0.0343) / 2;
  
  return distance;
}

void setup() {
  Serial.begin(115200);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    long distance = readDistance();
    Serial.print("Distance: ");
    Serial.println(distance);

    String jsonData = "{\"distance\":" + String(distance) + "}";

    // Pass the WiFiClient object to the http.begin() method
    http.begin(client, serverUrl);
    http.addHeader("Content-Type", "application/json");

    int httpResponseCode = http.POST(jsonData);

    if (httpResponseCode > 0) {
      Serial.println("Data sent successfully: " + String(httpResponseCode));
    } else {
      Serial.println("Error sending data: " + String(httpResponseCode));
    }

    http.end();
  }
  
  delay(600);  // Send data every minute
}
