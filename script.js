let inputMode = "HEX"; // Current input input mode
let inputValueStr = ""; // Value in the current mode STRING

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
  inputValueStr += receivedNumber;
  //console.log(inputValueStr)
  showInputValue();
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

  clearMemory();

  showInputValue();
}

// Delete a char from the input value as long as there are chars
function deleteChar (){

  if (memory["operation"] != ""){
    removeLastCharOnlyInDisplays();
    clearMemory();
  } else if (inputValueStr != ""){
    inputValueStr = inputValueStr.substring(0,inputValueStr.length - 1)
    //console.log(inputValueStr)
    showInputValue()
  }
  
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

  if (newMode == 'HEX'){
    inputValueStr = decValue.toString(16).toUpperCase();
  } else if (newMode == 'DEC'){
    inputValueStr = decValue.toString();
  } else if (newMode == 'OCT'){
    inputValueStr = decValue.toString(8);
  } else if (newMode == 'BIN'){
    inputValueStr = decValue.toString(2);
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

  // According to current inputMode turn on/off section of the keypad
  if (newMode == 'HEX'){

    for (var i = 0; i < hex_buttons.length ;i++){
      hex_buttons[i].disabled = false
    }
    for (var i = 0; i < oct_buttons.length ;i++){
      oct_buttons[i].disabled = false
    }
    for (var i = 0; i < bin_buttons.length ;i++){
      bin_buttons[i].disabled = false
    }
  
  } else if (newMode == 'DEC') {

    for (var i = 0; i < hex_buttons.length ;i++){
      hex_buttons[i].disabled = true
    }
    for (var i = 0; i < oct_buttons.length ;i++){
      oct_buttons[i].disabled = false
    }
    for (var i = 0; i < bin_buttons.length ;i++){
      bin_buttons[i].disabled = false
    }

  } else if (newMode == 'OCT') {

    for (var i = 0; i < hex_buttons.length ;i++){
      hex_buttons[i].disabled = true
    }
    for (var i = 0; i < oct_buttons.length ;i++){
      oct_buttons[i].disabled = true
    }
    for (var i = 0; i < bin_buttons.length ;i++){
      bin_buttons[i].disabled = false
    }
    
  } else if (newMode == 'BIN') {

    for (var i = 0; i < hex_buttons.length ;i++){
      hex_buttons[i].disabled = true
    }
    for (var i = 0; i < oct_buttons.length ;i++){
      oct_buttons[i].disabled = true
    }
    for (var i = 0; i < bin_buttons.length ;i++){
      bin_buttons[i].disabled = true
    }
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

}



function get_memory_mode_value_dec (){
  if (memoryMode == 'HEX'){
    return parseInt(memoryValue, 16);
  } else if (memoryMode == 'DEC'){
    return parseInt(memoryValue, 10);
  } else if (memoryMode == 'OCT'){
    return parseInt(memoryValue, 8);
  } else if (memoryMode == 'BIN'){
    return parseInt(memoryValue, 2);
  } 
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

function operation (operationType) {
  // If we have something in our input but our memory is free
  // Add the operation type, input value and mode to memory
  if (memory["value"] == "" && inputValueStr != "") { 
    memory["operation"] = operationType;
    putCharOnlyInDisplays(operationType);
    storeInputToMemory();
    console.log(memory);
  } else if ( memory["value"] != "" && inputValueStr != "") {
    memory["operation"] = operationType;
    removeLastCharOnlyInDisplays();
    putCharOnlyInDisplays(operationType);
    console.log(memory);
  } else {
    console.log("Nothing to make operations on")
  }
  

}

function equals(){
  if (memoryValue != "" && inputValueStr != "") {

    if (memory["operation"] == 'x'){
      var temp = get_memory_mode_value_dec() * get_mode_value_dec();
    } else if (memory["operation"] == '/'){
      var temp = get_memory_mode_value_dec() / get_mode_value_dec();
    } else if (memory["operation"] == '+'){
      var temp = get_memory_mode_value_dec() + get_mode_value_dec();
    } else if (memory["operation"] == '-'){
      var temp = get_memory_mode_value_dec() - get_mode_value_dec();
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

    console.log(inputValueStr);
    populate_results();
   
  }
}



function switchTheme() {
  let theme = document.getElementById("theme");
  if (theme.getAttribute("href") == "light.css") {
    theme.href = "dark.css";

    let dark_btns = document.getElementsByClassName("btn")
    for (var i = 0; i < dark_btns.length ;i++){
      dark_btns[i].classList.remove("btn-light");
      dark_btns[i].classList.add("btn-dark");
    }
    
  } else {
    theme.href = "light.css";
    let dark_btns = document.getElementsByClassName("btn")
    for (var i = 0; i < dark_btns.length ;i++){
      dark_btns[i].classList.remove("btn-dark");
      dark_btns[i].classList.add("btn-light");
    }
  }
}