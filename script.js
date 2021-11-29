let theme = "light";

let inputMode = "HEX"; // Current input input mode
let inputValueStr = ""; // Value in the current mode STRING

// 0: The user hasnt entered anything
// 1: There is input on the screen
// 2: A math operation has been selected
// 3: The user is entering the second value
// 4: Math operation is done
// 5: Loop back to 0 if c, del, key or 2 if another further operation is selected
let operationState = 0; 

let memory = {
  "mode": "",
  "value": "",
  "operation":""
}

// Convert a char depending on the mode to decimal value
function getInputValueInt (){
  if (inputMode == 'HEX'){
    var rtn = parseInt(inputValueStr, 16);
  } else if (inputMode == 'DEC'){
    var rtn = parseInt(inputValueStr, 10);
  } else if (inputMode == 'OCT'){
    var rtn = parseInt(inputValueStr, 8);
  } else if (inputMode == 'BIN'){
    var rtn = parseInt(inputValueStr, 2);
  } 

  return rtn;
}

// Returns 4 variables with HEX, DEC, OCT, BIN values in Str
function getInputValueConvertStr () {
  var decValue = getInputValueInt(); // Get the Input value as an Integer Decimal

  // When backspacing if you convert "" to an int you get NaN
  // we dont want to show NaN instead return empty strings
  if (Number.isNaN(decValue) == true){ 
    var hexValue = "";
    decValue = "";
    var octValue = "";
    var binValue = "";
  } else {
    var hexValue = decValue.toString(16).toUpperCase(); // HEX
    var octValue = decValue.toString(8);
    var binValue = decValue.toString(2);
    decValue = decValue.toString();
  }

  return[hexValue, decValue, octValue, binValue];
}

// Appends the clicked char to the str input value.
function putChar(receivedNumber) {
  if (operationState == 0 || operationState == 1 || operationState == 3){
    inputValueStr += receivedNumber;
    console.log(inputValueStr);
    console.log(memory);
    showInputValue();
    if (operationState == 0){operationState++;}
    console.log("Operation state: " + operationState);
  } else if (operationState == 2){
    inputValueStr = "";
    inputValueStr += receivedNumber;
    showInputValue();
    operationState++;
    console.log("Operation state: " + operationState);
  } else if (operationState == 4) {
    clearScreen();
    putChar(receivedNumber);
  }
    
  
}

function putCharOnlyInDisplays (received_char){
  document.getElementById("result-HEX").value = document.getElementById("result-HEX").value + received_char;
  document.getElementById("result-DEC").value = document.getElementById("result-DEC").value + received_char;
  document.getElementById("result-OCT").value = document.getElementById("result-OCT").value + received_char;
  document.getElementById("result-BIN").value = document.getElementById("result-BIN").value + received_char;
}

function removeLastCharOnlyInDisplays (){
  
  document.getElementById("result-HEX").value = document.getElementById("result-HEX").value.substring(0,document.getElementById("result-HEX").value.length - 1);
  document.getElementById("result-DEC").value = document.getElementById("result-DEC").value.substring(0,document.getElementById("result-DEC").value.length - 1);
  document.getElementById("result-OCT").value = document.getElementById("result-OCT").value.substring(0,document.getElementById("result-OCT").value.length - 1);
  document.getElementById("result-BIN").value = document.getElementById("result-BIN").value.substring(0,document.getElementById("result-BIN").value.length - 1);
  
}

// Clears the screen and all variables on click of C button.
function clearScreen() {

  /* document.getElementById("result-HEX").value = "";
  document.getElementById("result-DEC").value = "";
  document.getElementById("result-OCT").value = "";
  document.getElementById("result-BIN").value = ""; */

  inputValueStr = "";
  operationState = 0;

  clearMemory();

  showInputValue();
}

// Delete a char from the input value as long as there are chars
function deleteChar (){
  
  if (operationState == 1 || operationState == 3){
    inputValueStr = inputValueStr.substring(0,inputValueStr.length - 1)
    //console.log(inputValueStr)
    showInputValue()
  } else if (operationState == 2) {
    removeLastCharOnlyInDisplays();
    clearMemory();
    operationState--;
  } else if (operationState == 4) {
    clearScreen();
  }

  console.log("Operation state: " + operationState);
  
}

// Puts the current input value on the screen
function showInputValue (){
  
  var [hexValue, decValue, octValue, binValue] = getInputValueConvertStr();

  document.getElementById("result-HEX").value = hexValue;
  document.getElementById("result-DEC").value = decValue;
  document.getElementById("result-OCT").value = octValue;
  document.getElementById("result-BIN").value = binValue;
}

function convertInputToMode (newMode) {

  var decValue = getInputValueInt();

  if (Number.isNaN(decValue) == false) {
    if (newMode == 'HEX'){
      inputValueStr = decValue.toString(16).toUpperCase();
    } else if (newMode == 'DEC'){
      inputValueStr = decValue.toString();
    } else if (newMode == 'OCT'){
      inputValueStr = decValue.toString(8);
    } else if (newMode == 'BIN'){
      inputValueStr = decValue.toString(2);
    } 
  } else {
    inputValueStr = "";
  }

  inputMode = newMode;
}

function changeKeypadToMode (newMode) {

  // Remove the outline style frpm the active results
  var btn_result = document.getElementById("btn-result-" + inputMode);
  var input_result = document.getElementById("result-" + inputMode);
  btn_result.classList.remove("button-active");
  input_result.classList.remove("input-active");

  // Set outline style to the result according to new inputMode
  var btn_result = document.getElementById("btn-result-" + newMode);
  var input_result = document.getElementById("result-" + newMode);
  btn_result.classList.add("button-active");
  input_result.classList.add("input-active");

  // Get sections on the keypad to turn on/off
  var hex_buttons = document.getElementsByClassName("button-HEX");
  var oct_buttons = document.getElementsByClassName("button-OCT");
  var bin_buttons = document.getElementsByClassName("button-BIN");

  if (newMode == 'HEX'){
    var whichDisable = [false,false,false];
  } else if (newMode == 'DEC'){
    var whichDisable = [true,false,false];
  } else if (newMode == 'OCT'){
    var whichDisable = [true,true,false];
  } else if (newMode == 'BIN'){
    var whichDisable = [true,true,true];
  }

  for (var i = 0; i < hex_buttons.length ;i++){
    hex_buttons[i].disabled = whichDisable[0];
  }
  for (var i = 0; i < oct_buttons.length ;i++){
    oct_buttons[i].disabled = whichDisable[1];
  }
  for (var i = 0; i < bin_buttons.length ;i++){
    bin_buttons[i].disabled = whichDisable[2];
  }

}

// When HEX, DEC, OCT or BIN is pressed 
// Update the keypad UI and convert the input
// value to the new mode
function switchMode(received_mode) {

  // change the keypad layout to a new mode
  changeKeypadToMode(received_mode);

  // Change the inputMode and InputValue to the new mode
  convertInputToMode(received_mode);


  console.log(inputMode);

}



function storeInputToMemory(){
  memory["value"] = inputValueStr;
  memory["mode"] = inputMode;
  
}

function clearMemory(){
  memory["value"] = "";
  memory["mode"] = "";
  memory["operation"] = "";
  console.log(memory);
  
}

function getMemoryValueInt (){
  if (memory["mode"] == 'HEX'){
    var rtn = parseInt(memory["value"], 16);
  } else if (memory["mode"] == 'DEC'){
    var rtn = parseInt(memory["value"], 10);
  } else if (memory["mode"] == 'OCT'){
    var rtn = parseInt(memory["value"], 8);
  } else if (memory["mode"] == 'BIN'){
    var rtn = parseInt(memory["value"], 2);
  } 

  return rtn;
}

function operation (operationType) {


  if (operationState == 1){
    memory["operation"] = operationType;
    putCharOnlyInDisplays(operationType);
    storeInputToMemory();
    console.log(memory);
    operationState++;
  } else if (operationState == 2){
    memory["operation"] = operationType;
    removeLastCharOnlyInDisplays();
    putCharOnlyInDisplays(operationType);
    console.log(memory);
  } else if (operationState == 3){
    equals();
    storeInputToMemory();
    memory["operation"] = operationType;
    putCharOnlyInDisplays(operationType);

    operationState = 2;

    console.log(memory);
  } else if (operationState == 4){
    memory["operation"] = operationType;
    putCharOnlyInDisplays(operationType);
    storeInputToMemory();
    console.log(memory);
    operationState = 2;
  }
  console.log("Operation state: " + operationState);

}

function equals(){

  console.log("Input Value: " + inputValueStr);
  console.log("Memory: ");
  console.log(memory);
  console.log("Operation state: " + operationState);

  if (operationState == 3) {
    if (memory["operation"] == 'x'){
      var temp = getMemoryValueInt() * getInputValueInt();
    } else if (memory["operation"] == '/'){
      var temp = getMemoryValueInt() / getInputValueInt();
    } else if (memory["operation"] == '+'){
      var temp = getMemoryValueInt() + getInputValueInt();
    } else if (memory["operation"] == '-'){
      var temp = getMemoryValueInt() - getInputValueInt();
    } 

    temp = parseInt(temp, 10);// Round the value by converting it to int

    
    if (inputMode == 'HEX'){
      inputValueStr = temp.toString(16).toUpperCase();
    } else if (inputMode == 'DEC'){
      inputValueStr = temp.toString(10);
    } else if (inputMode == 'OCT'){
      inputValueStr = temp.toString(8);
    } else if (inputMode == 'BIN'){
      inputValueStr = temp.toString(2);
    }

    showInputValue();

    clearMemory();
    console.log(inputValueStr);

    operationState++; // stage 4
    console.log("Operation state: " + operationState);
  }
}



function switchTheme() {
 
  if (theme == "light") {
    var remove = "light"
    var add = "dark"
    theme = "dark"
  } else if (theme == "dark") {
    var add = "light"
    var remove = "dark"
    theme = "light"
  }

  let btns = document.getElementsByClassName("btn")
  for (var i = 0; i < btns.length ;i++){
    btns[i].classList.remove("btn-" + remove);
    btns[i].classList.add("btn-" + add);
  }

  let calculator = document.getElementsByClassName("calculator")
  for (var i = 0; i < calculator.length ;i++){
    calculator[i].classList.remove("background-" + remove);
    calculator[i].classList.add("background-" + add);
  }

  let results = document.getElementsByClassName("results")
  for (var i = 0; i < results.length ;i++){
    results[i].classList.remove("input-" + remove);
    results[i].classList.add("input-" + add);
  }

  let actions = document.getElementsByClassName("action-btn")
  for (var i = 0; i < actions.length ;i++){
    actions[i].classList.remove("action-" + remove);
    actions[i].classList.add("action-" + add);
  }

  
    
  
}