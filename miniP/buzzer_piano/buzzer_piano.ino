//A program that makes the arduino into a tiny piano with a active piezo buzzer.
//It can be easily scaled by adding or removing buttons.
//Wirrten 11/28/2020


//define buzzer & button pins.
const int buzzerPin = 13;
const int but1 = 2;
const int but2 = 3;
const int but3 = 4;
const int but4 = 5;

void setup() {

  //set inputs and outputs
  pinMode(buzzerPin, OUTPUT);
  pinMode(but1, INPUT_PULLUP);
  pinMode(but2, INPUT_PULLUP);
  pinMode(but3, INPUT_PULLUP);
  pinMode(but4, INPUT_PULLUP);

}

void loop() {
 
  //if button 1 is pressed, then 100hz signal to buzzer.
  //same principle for all buzzers
  
  //tone(pin, freq. in hz., duration)
  if (digitalRead(but1) == LOW){
    tone(buzzerPin, 100, 10);
  }

  if (digitalRead(but2) == LOW){
    tone(buzzerPin, 200, 10);
  }

  if (digitalRead(but3) == LOW){
    tone(buzzerPin, 300, 10);
  }

  if (digitalRead(but4) == LOW){
    tone(buzzerPin, 5000, 10);
  }

}
