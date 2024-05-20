#include <SoftwareSerial.h>

// Define software serial pins for RX and TX
const int rxPin = 15;  // RX pin of Arduino (connected to TX of sensor)
const int txPin = 14;  // TX pin of Arduino (connected to RX of sensor)

// Initialize software serial object
SoftwareSerial mySerial(rxPin, txPin);

void setup() {
  // Start the hardware serial communication for debugging
  Serial.begin(9600);
  // Start the software serial communication
  mySerial.begin(9600);

  Serial.println("Color sensor initialized");

  // Additional debugging: Send a command to the sensor if required
  // mySerial.println("COMMAND_TO_START_SENDING_DATA"); // Uncomment and replace with actual command if needed
}

void loop() {
  // Check if data is available on the software serial port
  if (mySerial.available() > 0) {
    Serial.println("Data available from sensor");

    // Read the incoming data
    String sensorData = mySerial.readStringUntil('\n');
    Serial.print("Raw sensor data: ");
    Serial.println(sensorData);

    // Split the sensor data into RGB components
    int redValue, greenValue, blueValue;
    int numValues = sscanf(sensorData.c_str(), "%d %d %d", &redValue, &greenValue, &blueValue);

    // Ensure we have read three values
    if (numValues == 3) {
      // Print the RGB values
      Serial.print("R = ");
      Serial.print(redValue);
      Serial.print("  G = ");
      Serial.print(greenValue);
      Serial.print("  B = ");
      Serial.println(blueValue);

      // Interpret the color
      interpretColor(redValue, greenValue, blueValue);
    } else {
      Serial.println("Failed to parse RGB values");
    }
  } else {
    Serial.println("No data available from sensor");
  }

  delay(1000); // Delay of 1 second
}

void interpretColor(int red, int green, int blue) {
  if (red > green && red > blue) {
    Serial.println("Color is Red");
  } else if (green > red && green > blue) {
    Serial.println("Color is Green");
  } else if (blue > red && blue > green) {
    Serial.println("Color is Blue");
  } else {
    Serial.println("Color is Unknown");
  }
}


const int S0 = 4;
const int S1 = 5;
const int S2 = 6;
const int S3 = 7;
const int sensorOut = 8;




 // pinMode(S0, OUTPUT);
 // pinMode(S1, OUTPUT);
  //pinMode(S2, OUTPUT);
  //pinMode(S3, OUTPUT);
 // pinMode(sensorOut, INPUT);

  // Setting frequency-scaling to 20%
 // digitalWrite(S0, HIGH);
 // digitalWrite(S1, LOW);


  // Setting RED filtered photodiodes to be read
  digitalWrite(S2, LOW);
  digitalWrite(S3, LOW);
  // Reading the output frequency
  int redFrequency = pulseIn(sensorOut, LOW);

  // Setting GREEN filtered photodiodes to be read
  digitalWrite(S2, HIGH);
  digitalWrite(S3, HIGH);
  // Reading the output frequency
  int greenFrequency = pulseIn(sensorOut, LOW);

  // Setting BLUE filtered photodiodes to be read
  digitalWrite(S2, LOW);
  digitalWrite(S3, HIGH);
  // Reading the output frequency
  int blueFrequency = pulseIn(sensorOut, LOW);

  // Send the RGB values over serial
  mySerial.print("R:");
  mySerial.print(redFrequency);
  mySerial.print(" G:");
  mySerial.print(greenFrequency);
  mySerial.print(" B:");
  mySerial.println(blueFrequency);

  // Delay before the next reading
  delay(1000);
}
