#include <SoftwareSerial.h>

// Define the pins for RX and TX
#define RX_PIN 10
#define TX_PIN 11

// Create a SoftwareSerial object
SoftwareSerial mySerial(RX_PIN, TX_PIN);

void setup() {
  // Start the hardware serial for debugging
  Serial.begin(9600);
  // Start the software serial for the UART module
  mySerial.begin(9600);

  Serial.println("TCS230 Module UART Communication Test");
}

void loop() {
  // Send a command to the UART module to request color data
  mySerial.write("R"); // Replace "R" with the actual command if different

  // Wait for the module to respond
  delay(500);

  // Variables to store the color values
  uint16_t red = 0, green = 0, blue = 0, clear = 0;

  // Check if data is available from the UART module
  if (mySerial.available() >= 8) { // Assuming the module sends 8 bytes: 2 bytes each for red, green, blue, clear
    red = mySerial.read() << 8 | mySerial.read();
    green = mySerial.read() << 8 | mySerial.read();
    blue = mySerial.read() << 8 | mySerial.read();
    clear = mySerial.read() << 8 | mySerial.read();

    // Print the received color data to the hardware serial for monitoring
    Serial.print("Red: "); Serial.print(red);
    Serial.print(" Green: "); Serial.print(green);
    Serial.print(" Blue: "); Serial.print(blue);
    Serial.print(" Clear: "); Serial.println(clear);

    // Simple color identification
    if (red > green && red > blue) {
      Serial.println("Color: Red");
    } else if (green > red && green > blue) {
      Serial.println("Color: Green");
    } else if (blue > red && blue > green) {
      Serial.println("Color: Blue");
    } else {
      Serial.println("Color: Unknown");
    }
  } else {
    Serial.println("No sufficient data received from module");
  }

  delay(1000); // Adjust delay as needed
}
