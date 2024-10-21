// Filename: Lab3Part3Sender.ino
// Authors: Caitlyn Rawlings, Hao Tian
// Date: 7/19/24
// Description: This file defines a sender ESP32 that sends a message to a receiver ESP32 when a button is pressed using ESP-NOW.
// Version 1.0

// ============== Includes ==============
#include <esp_now.h>
#include <WiFi.h>

// =============== Macros ================
const int buttonPin = 5; // Set the button pin to GPIO 5

// =============== Global Variables ================
uint8_t broadcastAddress[] = {0xDC, 0xDA, 0x0C, 0x22, 0xF5, 0x58}; 
volatile bool buttonPressed = false; // Flag to indicate button press

// =========== Function Prototypes ===========
void IRAM_ATTR handleButtonPress();
void onDataSent(const uint8_t *mac_addr, esp_now_send_status_t status);

// ============== Implementations =============

/**
 * @brief ISR function to handle button press
 * This function is called when the button is pressed. It sets the buttonPressed flag to true.
 */
void IRAM_ATTR handleButtonPress() {
    buttonPressed = true; // Set the flag to true when button is pressed
}

/**
 * @brief Callback function called when data is sent
 * @param mac_addr The MAC address of the peer
 * @param status The status of the send operation
 * This function handles the result of the data send operation.
 */
void onDataSent(const uint8_t *mac_addr, esp_now_send_status_t status) {
    // Handle the result of data send operation
}

void setup() {
    Serial.begin(9600); // Initialize serial communication
    delay(2000); // Delay to ensure stable startup

    WiFi.mode(WIFI_STA); // Set WiFi mode to station

    // Set button pin as input and attach an interrupt
    pinMode(buttonPin, INPUT_PULLUP);
    attachInterrupt(digitalPinToInterrupt(buttonPin), handleButtonPress, FALLING);

    // Initialize ESP-NOW
    if (esp_now_init() != ESP_OK) {
        return; // Return if ESP-NOW initialization fails
    }
    delay(2000); // Delay to ensure stable setup
    esp_now_register_send_cb(onDataSent); // Register the send callback function

    // Configure peer information
    esp_now_peer_info_t peerInfo; // Data structure for handling peer information
    memset(&peerInfo, 0, sizeof(peerInfo)); // Clear peerInfo structure
    memcpy(peerInfo.peer_addr, broadcastAddress, 6); // Copy MAC address of the receiver
    peerInfo.channel = 0; // Set WiFi channel to 0 (default)
    peerInfo.encrypt = false; // Disable encryption
    
    // Add peer to ESP-NOW
    if (esp_now_add_peer(&peerInfo) != ESP_OK) {
        return; // Return if adding peer fails
    }
}

void loop() {
    // Check if button was pressed
    if (buttonPressed) {
        buttonPressed = false; // Reset button press flag

        const char* message = "Button Pressed"; // Message to be sent
        esp_now_send(broadcastAddress, (uint8_t *)message, strlen(message)); // Send message
    }
}