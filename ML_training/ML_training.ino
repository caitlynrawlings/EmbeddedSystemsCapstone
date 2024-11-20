#include <Adafruit_BNO08x.h>

// For SPI mode, we need a CS pin
#define BNO08X_CS D10
#define BNO08X_INT D8 //D6

// For SPI mode, we also need a RESET
#define BNO08X_RESET D7 //D5

Adafruit_BNO08x bno08x(BNO08X_RESET);
sh2_SensorValue_t sensorValue;

struct euler_t {
  float yaw;
  float pitch;
  float roll;
} ypr;


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

void setReports() {
  Serial.println("Setting desired reports");
  if (! bno08x.enableReport(SH2_ARVR_STABILIZED_RV, 5000)) {
    Serial.println("Could not enable stabilized remote vector");
  }
  if (!bno08x.enableReport(SH2_LINEAR_ACCELERATION, 5000)) {
    Serial.println("Could not enable linear acceleration");
  }
}

void quaternionToEuler(float qr, float qi, float qj, float qk, euler_t* ypr, bool degrees = false) {

    float sqr = sq(qr);
    float sqi = sq(qi);
    float sqj = sq(qj);
    float sqk = sq(qk);

    ypr->yaw = atan2(2.0 * (qi * qj + qk * qr), (sqi - sqj - sqk + sqr));
    ypr->pitch = asin(-2.0 * (qi * qk - qj * qr) / (sqi + sqj + sqk + sqr));
    ypr->roll = atan2(2.0 * (qj * qk + qi * qr), (-sqi - sqj + sqk + sqr));

    if (degrees) {
      ypr->yaw *= RAD_TO_DEG;
      ypr->pitch *= RAD_TO_DEG;
      ypr->roll *= RAD_TO_DEG;
    }
}

void quaternionToEulerRV(sh2_RotationVectorWAcc_t* rotational_vector, euler_t* ypr, bool degrees = false) {
    quaternionToEuler(rotational_vector->real, rotational_vector->i, rotational_vector->j, rotational_vector->k, ypr, degrees);
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

  static float acc_x;
  static float acc_y;
  static float acc_z;

  static bool accel_found = false;
  static bool arvr_found = false;
  switch (sensorValue.sensorId) {
    case SH2_LINEAR_ACCELERATION:
      if (!accel_found) {
        acc_x = sensorValue.un.accelerometer.x;
        acc_y = sensorValue.un.accelerometer.y;
        acc_z = (sensorValue.un.accelerometer.z);
        accel_found = true;
      }
      break;
    case SH2_ARVR_STABILIZED_RV:
      if (!arvr_found) {
        quaternionToEulerRV(&sensorValue.un.arvrStabilizedRV, &ypr, true);
        arvr_i = (ypr.yaw);
        arvr_j = (ypr.pitch);
        arvr_k = (ypr.roll);
        arvr_found = true;
      }
      break;
  }

  if (arvr_found && accel_found) {
    arvr_found = false;
    accel_found = false;
    Serial.print(acc_x);
    Serial.print("\t");
    Serial.print(acc_y);
    Serial.print("\t");
    Serial.print(acc_z);
    Serial.print("\t");
    Serial.print(ypr.yaw);
    Serial.print("\t");
    Serial.print(ypr.pitch);
    Serial.print("\t");
    Serial.print(ypr.roll);
    Serial.println("");
  }


}
