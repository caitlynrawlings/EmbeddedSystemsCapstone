#include "Statistic.h"
#include "model.h"

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

const uint16_t window_size = 150;

statistic::Statistic<float, int16_t, true> xs;
statistic::Statistic<float, int16_t, true> ys;
statistic::Statistic<float, int16_t, true> zs;
statistic::Statistic<float, int16_t, true> yaws;
statistic::Statistic<float, int16_t, true> pitches;
statistic::Statistic<float, int16_t, true> rolls;

int16_t features[24];


void setup() {
  // set up serial
  Serial.begin(115200);
  while(!Serial);
  delay(1000);
  Serial.println("Serial is ready");

  // set up IMU
  while (!bno08x.begin_SPI(BNO08X_CS, BNO08X_INT)) {
    Serial.println("Failed to find BNO08x chip");
    delay(100);
  }
  Serial.println("BNO08x Found!");

  setReports();

  Serial.println("Reading events");

  xs.clear();
  ys.clear();
  zs.clear();
  yaws.clear();
  pitches.clear();
  rolls.clear();

  Serial.println("Go!");
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
  float x, y, z;

  if (!bno08x.getSensorEvent(&sensorValue)) {
    return;
  }

  // check for fast speed
  switch (sensorValue.sensorId) {
    case SH2_LINEAR_ACCELERATION:
      x = sensorValue.un.accelerometer.x;
      y = sensorValue.un.accelerometer.y;
      z = (sensorValue.un.accelerometer.z);
      
      if (x > 5 || y > 5 || z > 5) {
        Serial.println("true");
        determine_gesture();
      }

      break;
    case SH2_ARVR_STABILIZED_RV:
      break;
  }



}

void determine_gesture() {
  static float x, y, z;
  static bool accel_found = false;
  static bool arvr_found = false;

  while (xs.count() < window_size) {
    if (!bno08x.getSensorEvent(&sensorValue)) {
      return;
    }

    switch (sensorValue.sensorId) {
      case SH2_LINEAR_ACCELERATION:
        if (!accel_found) {
          x = sensorValue.un.accelerometer.x;
          y = sensorValue.un.accelerometer.y;
          z = (sensorValue.un.accelerometer.z);
          accel_found = true;
        }
        break;
      case SH2_ARVR_STABILIZED_RV:
        if (!arvr_found) {
          quaternionToEulerRV(&sensorValue.un.arvrStabilizedRV, &ypr, true);
          arvr_found = true;
        }
        break;
    }

    if (arvr_found && accel_found) {
      arvr_found = false;
      accel_found = false;
      // accumulate IMU in sliding window
      xs.add(x);
      ys.add(y);
      zs.add(z);
      yaws.add(ypr.yaw);
      pitches.add(ypr.pitch);
      rolls.add(ypr.roll);
    }

    if (xs.count() >= window_size) {
      // extract statistical features
      features[0] = xs.minimum();
      features[1] = xs.maximum();
      features[2] = xs.average();
      features[3] = xs.pop_stdev();
      features[4] = ys.minimum();
      features[5] = ys.maximum();
      features[6] = ys.average();
      features[7] = ys.pop_stdev();
      features[8] = zs.minimum();
      features[9] = zs.maximum();
      features[10] = zs.average();
      features[11] = zs.pop_stdev();

      features[12] = yaws.minimum();
      features[13] = yaws.maximum();
      features[14] = yaws.average();
      features[15] = yaws.pop_stdev();
      features[16] = pitches.minimum();
      features[17] = pitches.maximum();
      features[18] = pitches.average();
      features[19] = pitches.pop_stdev();
      features[20] = rolls.minimum();
      features[21] = rolls.maximum();
      features[22] = rolls.average();
      features[23] = rolls.pop_stdev();

      // run model inference
      const int32_t prediction = model_predict(features, 24);
      Serial.println(prediction);

      // slide the window
      xs.clear();
      ys.clear();
      zs.clear();
      yaws.clear();
      pitches.clear();
      rolls.clear();

      break;
    }
  }
}
