#include <WiFi.h>
#include <esp_wifi.h>


void setup() {
 Serial.begin(115200); 
 while (!Serial);
// Set the WiFi mode to station mode (WIFI_STA), which means the ESP32 acts as a WiFi // client
 WiFi.mode(WIFI_STA); 


 Serial.print("MAC Address: ");
// Get the MAC address of the ESP32 and print it to the serial monitor
 Serial.println(WiFi.macAddress()); }


void loop() {}