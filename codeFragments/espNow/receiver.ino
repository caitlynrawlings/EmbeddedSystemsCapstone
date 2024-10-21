// File: Lab3Part3Receiver.ino
// Authors: Hao Tian, Caitlyn Rawlings
// Date: 7/17/24
// Description: This file has code that prints a counter of time since
// last message has been received to an lcd display. And prints a notification 
// to the lcd display when a message is received wirelessly via ESP-NOW


// ============ Includes ============
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <esp_now.h>
#include <WiFi.h>

// ========= Global Variables ========
LiquidCrystal_I2C lcd(0x27, 16, 2);
volatile bool messageReceived = false;
int counter = 0;  // time since last message received
hw_timer_t * timer = NULL; // Declare a timer variable and initialize to null


// Name: dataReceived
// Definition: ISR for gets called when a message is received. Updates messageReceived flag
void IRAM_ATTR dataReceived(const uint8_t * mac, const uint8_t *incomingData, int len) {
  // =========> TODO: This callback function will be invoked when signal is received
  // 			over ESP-NOW. Implement the necessary functionality that will 
  //			trigger the message to the LCD.
  //			
  messageReceived = true;  // update messageReceived flag
}

// Name: IRAM_ATTR
// Definition: ISR triggered by a timer that occurs each second. Increments counter
void IRAM_ATTR timerInterrupt() {
  counter++;
}


void setup() {
  WiFi.mode(WIFI_STA);

  // =========> TODO: Initialize LCD display
  lcd.init();
  delay(2);
  lcd.backlight();

  // =========> TODO: create a timer, attach an interrupt, set an alarm which will
  //			update the counter every second.
  timer = timerBegin(0, 80, true); // Timer 0, prescaler 80, count up
  // Attach timerInterrupt function to the timer, triggered on the rising edge (true)
  timerAttachInterrupt(timer, &timerInterrupt, true); 
  // Set alarm to trigger interrupt every second, repeating (true)
  timerAlarmWrite(timer, 1000000, true);
  timerAlarmEnable(timer); // Enable the alarm
  delay(2000);

  // Initializes ESP-NOW and check if it was successful; if not, exit the setup function
  if (esp_now_init() != ESP_OK) return;
  // Registers the callback function 'dataReceived' to be called when data is received   
  // via ESP-NOW
  esp_now_register_recv_cb(dataReceived);
}


void loop() {
  // =========> TODO: Print out an incrementing counter to the LCD.
  //			If a signal has been received over ESP-NOW, print out “New
  // 			Message!” on the LCD
  lcd.setCursor(0, 0);  // move cursor to start of lcd display
  if (messageReceived) {
    lcd.print("New Message!");
    delay(2000);  // show new message alert for 2 seconds
    lcd.clear();
    counter = 0;  // reset counter
    messageReceived = false;  // reset flag
  }
  Serial.print()
  lcd.print(counter);  // print counter value
}
