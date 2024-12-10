/*
 *  Final source code for ECE475 AU24 Group 8
 *  This code provides implementation for the Infinity Glove,
 *  a glove that can be utilized as a Bluetooth-enabled mouse.
 *
 *  This code draws from several public libraries:
 *  Adafruit BNO085 IMU - https://github.com/adafruit/Adafruit_BNO08x
 *  BleCombo Mouse and Keyboard - https://github.com/blackketter/ESP32-BLE-Combo
 *  emlearn - https://emlearn.readthedocs.io/en/latest/#
 *
 *  Machine Learning code adapted from Richard Li, https://github.com/lichard49/ECE475_on_device_ml_tutorial/tree/main
 *
 *  Written by Anderson Lu, Caitlyn Rawlings, Zachary Wittgens, and Nicholas Wolff
 */

#include "Statistic.h"
#include "model.h"

#include <Adafruit_BNO08x.h>
#include <BleCombo.h>

#define BNO08X_CS D10
#define BNO08X_INT D8
#define BNO08X_RESET D7

#define INDEX 0
#define MIDDLE 1
#define RING 2
#define PINKY 3

#define HOLD_MS_DELAY 500

Adafruit_BNO08x  bno08x(BNO08X_RESET);
sh2_SensorValue_t sensorValue;

const uint16_t window_size = 100;

statistic::Statistic<float, int16_t, true> xs;
statistic::Statistic<float, int16_t, true> ys;
statistic::Statistic<float, int16_t, true> zs;
statistic::Statistic<float, int16_t, true> yaws;
statistic::Statistic<float, int16_t, true> pitches;
statistic::Statistic<float, int16_t, true> rolls;

int16_t features[24];

struct euler_t {
  float yaw;
  float pitch;
  float roll;
} ypr;

struct xyz_t {
  float x;
  float y;
  float z;
} accel;

typedef enum {
  S_LOW,
  S_TAP,
  S_HOLD
} State;
State s_cur[] = {S_LOW, S_LOW, S_LOW, S_LOW};

// Index 0 = index, 1 = middle, 2 = ring, 3 = pinky
long hold_ctr_cur[]= {0, 0, 0, 0};
long hold_ctr_start[] = {0, 0, 0, 0};
bool tap[] = {false, false, false, false};
bool hold[] = {false, false, false, false};
bool in = true;

float sens = 0.2;
bool calibrating = false;
float cal_max = -180;
float cal_min = 180;

void setup() {

  Serial.begin(115200);
  while (!Serial) delay(10);

  Serial.println("Starting BLE");
  Keyboard.begin();
  Mouse.begin();

  // thumb to ground
  pinMode(D2, INPUT);
  pinMode(A4, INPUT_PULLUP); // pointer
  pinMode(A5, INPUT_PULLUP); // middle
  pinMode(A6, INPUT_PULLUP); // ring
  pinMode(A7, INPUT_PULLUP); // pinky

  if (!bno08x.begin_SPI(BNO08X_CS, BNO08X_INT)) {
    Serial.println("Failed to find BNO08x chip");
    while (1) { delay(10); }
  }
  Serial.println("BNO08x Found!");

  setReports();

  xs.clear();
  ys.clear();
  zs.clear();
  yaws.clear();
  pitches.clear();
  rolls.clear();

  delay(100);
}

void loop() {
  handleUserInput();

  if (bno08x.wasReset()) {
    Serial.print("sensor was reset ");
    setReports();
  }
  
  if (!bno08x.getSensorEvent(&sensorValue)) {
    return;
  }

  switch (sensorValue.sensorId) {
    case SH2_LINEAR_ACCELERATION:
      accel.x = sensorValue.un.accelerometer.x;
      accel.y = sensorValue.un.accelerometer.y;
      accel.z = sensorValue.un.accelerometer.z;

      // if moving a certain amount then check for gestures
      if (accel.x > 6 || accel.y > 6 || accel.z > 6 || accel.x < -6 || accel.y < -6 || accel.z < -6) {
        Serial.println("derterming gesture");
        determineGesture();
      }
      break;
    case SH2_GAME_ROTATION_VECTOR:
      sh2_RotationVectorWAcc_t* rotational_vector = &sensorValue.un.arvrStabilizedRV;
      quaternionToEuler(rotational_vector->real, rotational_vector->i, rotational_vector->j, rotational_vector->k, &ypr, true);
      break;
  }

  if (tap[INDEX]) {
    Mouse.click(MOUSE_LEFT);
  }

  if (hold[INDEX]) {
    Mouse.press(MOUSE_LEFT);
    Mouse.move(-ypr.yaw * sens, ypr.pitch * sens);
  } else if (Mouse.isPressed(MOUSE_LEFT)) {
    Mouse.release(MOUSE_LEFT);
  }

  if (tap[MIDDLE]) {
    Mouse.click(MOUSE_RIGHT);
  }

  if (hold[MIDDLE]) {
    Mouse.move(-ypr.yaw * sens, ypr.pitch * sens);
  }
  
  if (tap[RING]) {
    Mouse.click(MOUSE_MIDDLE);
  }

  if (hold[RING]) {
    if (ypr.pitch < -45) {
      Mouse.move(0, 0, 1);
    } else if (ypr.pitch > 45) {
      Mouse.move(0, 0, -1);
    }
    delay(10 / sens);
  }

  if (tap[PINKY]) {
    Serial.println(sh2_setTareNow(SH2_TARE_X | SH2_TARE_Y | SH2_TARE_Z, SH2_TARE_BASIS_GAMING_ROTATION_VECTOR));
  }

  if (hold[PINKY] || calibrating) {
    calibrate(calibrating);
  }

  // Serial.println(sens);
  // Serial.print("Index: "); Serial.print(tap[INDEX]); Serial.print("\t"); Serial.print(hold[INDEX]); Serial.print("\t");
  // Serial.print("Middle: "); Serial.print(tap[MIDDLE]); Serial.print("\t"); Serial.print(hold[MIDDLE]); Serial.print("\t");
  // Serial.print("Ring: "); Serial.print(tap[RING]); Serial.print("\t"); Serial.print(hold[RING]); Serial.print("\t");
  // Serial.print("Pinky: "); Serial.print(tap[PINKY]); Serial.print("\t"); Serial.println(hold[PINKY]);

  delay(10);
}

void setReports() {
  Serial.println("Setting desired reports");
  if (! bno08x.enableReport(SH2_GAME_ROTATION_VECTOR, 5000)) {
    Serial.println("Could not enable game rotation vector");
  }
  if (!bno08x.enableReport(SH2_LINEAR_ACCELERATION, 5000)) {
    Serial.println("Could not enable linear acceleration");
  }
  if (! bno08x.enableReport(SH2_ARVR_STABILIZED_RV, 5000)) {
    Serial.println("Could not enable stabilized remote vector");
  }
}


void quaternionToEuler(float qr, float qi, float qj, float qk, euler_t* ypr, bool degrees) {
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

void handleUserInput() {
    for (int i = INDEX; i <= PINKY; i++) {
    if (i == INDEX) {
      in = !digitalRead(A4);
    } else if (i == MIDDLE) {
      in = !digitalRead(A5);
    } else if (i == RING) {
      in = !digitalRead(A6);
    } else {
      in = !digitalRead(A7);
    }
  
    if (s_cur[i] == S_LOW) {
      hold[i] = false;
      tap[i] = false;
      if (in) {
        hold_ctr_start[i] = millis();
        s_cur[i] = S_TAP;
      }
    } else if (s_cur[i] == S_TAP) {
      hold_ctr_cur[i] = millis();
      if (in) {
        if (hold_ctr_cur[i] - hold_ctr_start[i] >= HOLD_MS_DELAY) {
          hold[i] = true;
          s_cur[i] = S_HOLD;
        }
      } else {
        tap[i] = true; 
        s_cur[i] = S_LOW;
      }
    } else if (s_cur[i] == S_HOLD) {
      hold[i] = in;
      s_cur[i] = in ? S_HOLD : S_LOW;
    }
  }
}

void calibrate(bool cal) {
  if (hold[PINKY]) {
    calibrating = true;
    if (max(ypr.yaw, ypr.pitch) > cal_max) {
      cal_max = max(ypr.yaw, ypr.pitch);
    }
    if (min(ypr.yaw, ypr.pitch) < cal_min) {
      cal_min = min(ypr.yaw, ypr.pitch);
    }
  } else if (cal) {
    calibrating = false;
    sens = max(0.0, 1 - (cal_max - cal_min) / 180.0) + 0.03;
    cal_max = -180;
    cal_min = 180;
  }
}

void determineGesture() {
  float x, y, z;
  bool accel_found = false;
  bool arvr_found = false;
  int stopedFor = 0;
  Serial.print("started calc: ");
      Serial.println(millis());

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
    }

    switch (sensorValue.sensorId) {
      case SH2_ARVR_STABILIZED_RV:
        if (!arvr_found) {
          quaternionToEulerRV(&sensorValue.un.arvrStabilizedRV, &ypr, true);
          arvr_found = true;
        }
        break;
    }


    if ((x > -1 && x < 1) && y > -1 && y < 1 && z > -1 && z < 1) {
      stopedFor += 1;
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

    if (xs.count() >= window_size || stopedFor > 2) {
      //
      
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
      // todo: add action
      switch (prediction) {
      case 0: // back
        Mouse.click(MOUSE_BACK);
        break;
      case 2: // esc
        Keyboard.write(KEY_ESC);
        break;
      case 3: // forward
        Mouse.click(MOUSE_FORWARD);
        break;
    }

      Serial.print("ended calc: ");
      Serial.println(millis());

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
