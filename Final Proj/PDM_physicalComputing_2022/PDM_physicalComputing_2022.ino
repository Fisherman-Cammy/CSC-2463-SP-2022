//Video Link: https://youtu.be/_RboAiqrCxg
#include "PDMSerial.h"

PDMSerial pdm;

const int analogPin = A0;  //the analog input pin sensor is attached to
const int pressurePin = A1; //the analog input pin light sensor is attached to

const int outPWMPin = 9;  // a pwm (analog) output pin
const int outPWMPin2 = 10;
const int outPWMPin3 = 11;

int sensorValue = 0;
int sensorTransmitValue = 0;

void setup() {
  // put your setup code here, to run once:
  
    // Input setup – add more inputs if desired
  pinMode(analogPin, INPUT);
  pinMode(pressurePin, INPUT);
    // Output setup – add more if desired
  pinMode(outPWMPin, OUTPUT);

  Serial.begin(9600);

}

void loop() {
  
  // Inputs – sample and prep the data for transmission
  sensorValue = analogRead(analogPin);//read the value from the analog sensor
  int pressureValue = analogRead(pressurePin);
  
  // resize the range of the sensor data if wanted...
  sensorTransmitValue = map(sensorValue,0,1023,0,255);//Convert from 0-1023 proportional to the number of a number of from 0 to 255
  
  // Transmit whatever sensors you like. When you are done, transmit end for the default ";" or your own separator.
  pdm.transmitSensor("a0", sensorValue);
  pdm.transmitSensor("pressure",pressureValue);
  pdm.transmitSensor("end");

  boolean newData = pdm.checkSerial();
  
  if(newData) {
    if(pdm.getName().equals(String("led"))) {
      digitalWrite(outPWMPin, pdm.getValue());
      digitalWrite(outPWMPin2, pdm.getValue());
      digitalWrite(outPWMPin3, pdm.getValue());
    } 
    
    else if (pdm.getName().equals(String("fade"))) {
      analogWrite(outPWMPin, pdm.getValue());
    }
  }
}
