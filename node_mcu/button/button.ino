#include <OpenWiFi.h>
#include <ArduinoJson.h>

#include <ESP8266HTTPClient.h>
#include <Servo.h>
#include <ESP8266WiFi.h>
#include <WiFiManager.h>

#include "SpringyValue.h"
#include "config.h"
#include "WS2812_util.h"

Servo myServo;

int oscillationTime = 500;
int steps = 0;
int potmeter = A0;
int productsSold = 0;
bool pressed = false;
String chipID;
String serverURL = SERVER_URL;
OpenWiFi hotspot;

void printDebugMessage(String message) {
#ifdef DEBUG_MODE
  Serial.println(String(PROJECT_SHORT_NAME) + ": " + message);
#endif
}

void setup()
{
  pinMode(BUTTONLOW_PIN, OUTPUT);
  pinMode(potmeter, INPUT);

  digitalWrite(BUTTONLOW_PIN, LOW);

  Serial.begin(115200); Serial.println("");
  strip.begin();
  strip.setBrightness(255);
  setAllPixels(0, 255, 255, 1.0);

  WiFiManager wifiManager;
  int counter = 0;

  pinMode(BUTTON_PIN, INPUT_PULLUP);

  while (digitalRead(BUTTON_PIN) == LOW)
  {
    counter++;
    delay(10);

    if (counter > 500)
    {
      wifiManager.resetSettings();
      printDebugMessage("Remove all wifi settings!");
      setAllPixels(255, 0, 0, 1.0);
      fadeBrightness(255, 0, 0, 1.0);
      ESP.reset();
    }
  }
  hotspot.begin(BACKUP_SSID, BACKUP_PASSWORD);

  chipID = generateChipID();
  printDebugMessage(String("Last 2 bytes of chip ID: ") + chipID);
  String configSSID = String(CONFIG_SSID) + "_" + chipID;

  wifiManager.autoConnect(configSSID.c_str());
  fadeBrightness(0, 255, 255, 1.0);
  myServo.attach(SERVO_PIN);
}

void loop() {
  steps++;
  int powerUsage = analogRead(potmeter);
  
  //Check for button press
  if (digitalRead(BUTTON_PIN) == LOW) {
    pressed = true;
  }

  // Check if button is released
  if (digitalRead(BUTTON_PIN) == HIGH && pressed == true) {
    productsSold++;
    pressed = false;
    Serial.println("There are " + String(productsSold) + " products sold");
  }

  if (steps % 200 == 1) {
    sendData(powerUsage, productsSold);
  }
//  struct timeval tv;
//  gettimeofday(&tv,NULL);
//  tv.tv_sec // seconds
//  Serial.println(analogRead(potmeter));
  delay(50);
  
}

void sendData(float powerUsage, int productsSold) {
  HTTPClient http;
  String requestString = serverURL + "/catererData/" + chipID + "/" + powerUsage + "/" + productsSold;
  Serial.println("Connecting to " + requestString);
  http.begin(requestString);
  http.GET();
  http.end();
}

void requestColor() {
  HTTPClient http;
  String requestString = serverURL + "/cue/" + chipID;
  http.begin(requestString);
  int httpCode = http.GET();
  
  if (httpCode == 200) {
    String response;
    response = http.getString();
    setColor(response);
  } else {
    ESP.reset();
  }

  http.end();
}

void setColor(String cue) {
  // Step 1: Reserve memory space
  StaticJsonBuffer<200> jsonBuffer;
  // Step 2: Deserialize the JSON string
  JsonObject& root = jsonBuffer.parseObject(cue);

  Serial.println(cue);
  
  bool notRegistered = root["notRegistered"];

  if (notRegistered) {
    setAllPixels(0, 0, 255);
    delay(1500);
    setAllPixels(0, 0, 0);
  } else {
    String currentUser = root["currentUser"];
    Serial.println(currentUser);
  
    if (!root.success()) {
      Serial.println("Parse JSON failed");
      return;
    }
    
    if (root["currentUser"]) {
      setAllPixels(0, 0, 0);
      delay(1500);
      setAllPixels(0, 255, 0);
    } else if (root["position"] > 0) {
      setAllPixels(255, 127, 0);
    } else if (root["free"] == "true") {
      setAllPixels(0, 255, 0);
    } else {
      setAllPixels(255, 0, 0);
    } 
  }
}

String generateChipID() {
  String chipIDString = String(ESP.getChipId() & 0xffff, HEX);

  chipIDString.toUpperCase();
  while (chipIDString.length() < 4)
    chipIDString = String("0") + chipIDString;

  return chipIDString;
}
