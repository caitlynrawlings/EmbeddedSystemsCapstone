#include <Adafruit_BNO08x.h>

// For SPI mode, we need a CS pin
#define BNO08X_CS D10
#define BNO08X_INT D8 //D6

// For SPI mode, we also need a RESET
#define BNO08X_RESET D7 //D5

Adafruit_BNO08x bno08x(BNO08X_RESET);
sh2_SensorValue_t sensorValue;


void setup() {
  Serial.begin(115200);

  while (!Serial)
    delay(10); // will pause Zero, Leonardo, etc until serial console opens

  Serial.println("Adafruit BNO08x test!");

  while (!bno08x.begin_SPI(BNO08X_CS, BNO08X_INT)) {
    Serial.println("Failed to find BNO08x chip");
    delay(100);
  }
  Serial.println("BNO08x Found!");

  setReports();

  Serial.println("Reading events");
  delay(100);

}

void setReports(void) {
  Serial.println("Setting desired reports");
  if (!bno08x.enableReport(SH2_ACCELEROMETER)) {
    Serial.println("Could not enable accelerometer");
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  if (bno08x.wasReset()) {
    Serial.print("sensor was reset ");
    setReports();
  }

  if (!bno08x.getSensorEvent(&sensorValue)) {
    return;
  }

  Serial.print(sensorValue.un.accelerometer.x);
  Serial.print("\t");
  Serial.print(sensorValue.un.accelerometer.y);
  Serial.print("\t");
  Serial.print(sensorValue.un.accelerometer.z);
  Serial.println("");
  // Serial.print("Accelerometer - x: ");
  // Serial.print(sensorValue.un.accelerometer.x);
  // Serial.print(" y: ");
  // Serial.print(sensorValue.un.accelerometer.y);
  // Serial.print(" z: ");
  // Serial.println(sensorValue.un.accelerometer.z);
}
