#include <ESP32Servo.h>

const int trigPin = 14;
const int echoPin = 27;
const int servoPin = 21;

Servo myServo;

long duration;
int distance;
bool movingForward = true;
int angle = 0;

void setup() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  myServo.setPeriodHertz(50);          // Set frekuensi PWM 50Hz (standar untuk servo)
  myServo.attach(servoPin, 500, 2400); // Attach pin dan atur pulse width minimum dan maksimum (µs)

  Serial.begin(9600);
}

void loop() {
  // Kirim sinyal trigger ke sensor ultrasonik
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);

  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Baca durasi echo
  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2;

  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  if (distance < 5) {
    // Jika benda dekat, servo berhenti
    delay(100);
  } else {
    // Servo bergerak bolak-balik
    if (movingForward) {
      angle += 1;
      if (angle >= 180) {
        angle = 180;
        movingForward = false;
      }
    } else {
      angle -= 1;
      if (angle <= 0) {
        angle = 0;
        movingForward = true;
      }
    }
    myServo.write(angle);
    delay(10);
  }
}
