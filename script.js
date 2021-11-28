let mode = "HEX";
let mode_value = "";

let memory_value = "";
let memory_mode = "";
let memory_operation = "";


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

// Clears the screen on click of C button.
function clearScreen() {
  document.getElementById("result-HEX").value = "";
  document.getElementById("result-DEC").value = "";
  document.getElementById("result-OCT").value = "";
  document.getElementById("result-BIN").value = "";
  mode_value = "";
  memory_value = "";
  memory_mode = "";
  memory_operation = "";
}

function get_mode_value_dec (){
  if (mode == 'HEX'){
    return parseInt(mode_value, 16);
  } else if (mode == 'DEC'){
    return parseInt(mode_value, 10);
  } else if (mode == 'OCT'){
    return parseInt(mode_value, 8);
  } else if (mode == 'BIN'){
    return parseInt(mode_value, 2);
  } 
}

function get_memory_mode_value_dec (){
  if (memory_mode == 'HEX'){
    return parseInt(memory_value, 16);
  } else if (memory_mode == 'DEC'){
    return parseInt(memory_value, 10);
  } else if (memory_mode == 'OCT'){
    return parseInt(memory_value, 8);
  } else if (memory_mode == 'BIN'){
    return parseInt(memory_value, 2);
  } 
}

function populate_results (){
  
  var dec_value = get_mode_value_dec();

  if (Number.isNaN(dec_value) == false) {

    var hex_value = dec_value.toString(16);
    var oct_value = dec_value.toString(8);
    var bin_value = dec_value.toString(2);

    document.getElementById("result-HEX").value = hex_value.toUpperCase();
    document.getElementById("result-DEC").value = dec_value.toString();
    document.getElementById("result-OCT").value = oct_value;
    document.getElementById("result-BIN").value = bin_value;
  } else {
    clearScreen()
  }
  
  

}
  
  // Displays the entered value on screen.
function putText(received_value) {
  
  mode_value += received_value;

  populate_results();
  
  
  
}

function deleteChar (){

  
  if (mode_value != ""){
    mode_value = mode_value.substring(0,mode_value.length - 1)

    populate_results()
  }
  
}


function switchMode(received_mode) {

  // When switching change the mode_value to the new mode
  var dec_value = get_mode_value_dec();

  if (received_mode == 'HEX'){
    mode_value = dec_value.toString(16).toUpperCase();
  } else if (received_mode == 'DEC'){
    mode_value = dec_value.toString();
  } else if (received_mode == 'OCT'){
    mode_value = dec_value.toString(8);
  } else if (received_mode == 'BIN'){
    mode_value = dec_value.toString(2);
  } 

  // Remove the outline style frpm the active results
  var btn_result = document.getElementById("btn-result-" + mode);
  var input_result = document.getElementById("result-" + mode);
  btn_result.classList.remove("button-active");
  input_result.classList.remove("input-active");

  // Change the mode to the one we received
  mode = received_mode;

  // Set outline style to the result according to new mode
  var btn_result = document.getElementById("btn-result-" + mode);
  var input_result = document.getElementById("result-" + mode);
  btn_result.classList.add("button-active");
  input_result.classList.add("input-active");


  // Get sections on the keypad to turn on/off
  var hex_buttons = document.getElementsByClassName("button-HEX");
  var oct_buttons = document.getElementsByClassName("button-OCT");
  var bin_buttons = document.getElementsByClassName("button-BIN");

  

  // According to current mode turn on/off section of the keypad
  if (received_mode == 'HEX'){

    

    for (var i = 0; i < hex_buttons.length ;i++){
      hex_buttons[i].disabled = false
    }
    for (var i = 0; i < oct_buttons.length ;i++){
      oct_buttons[i].disabled = false
    }
    for (var i = 0; i < bin_buttons.length ;i++){
      bin_buttons[i].disabled = false
    }
  
  } else if (received_mode == 'DEC') {

   

    for (var i = 0; i < hex_buttons.length ;i++){
      hex_buttons[i].disabled = true
    }
    for (var i = 0; i < oct_buttons.length ;i++){
      oct_buttons[i].disabled = false
    }
    for (var i = 0; i < bin_buttons.length ;i++){
      bin_buttons[i].disabled = false
    }

  } else if (received_mode == 'OCT') {

    for (var i = 0; i < hex_buttons.length ;i++){
      hex_buttons[i].disabled = true
    }
    for (var i = 0; i < oct_buttons.length ;i++){
      oct_buttons[i].disabled = true
    }
    for (var i = 0; i < bin_buttons.length ;i++){
      bin_buttons[i].disabled = false
    }
    
  } else if (received_mode == 'BIN') {

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

function operation (operation_type) {
 
  if (mode_value != "" && memory_value == "") {
    memory_value = mode_value;
    memory_operation = operation_type;
    memory_mode = mode;
    
    mode_value = "";
    
  } else if (mode_value== "" && memory_value != "") {
    memory_operation = operation_type;
  } else {
    equals()
    memory_value = "";
    memory_mode = "";
    memory_operation = "";
  }
  
  console.log(memory_value + operation_type + memory_mode);

}

function equals(){
  if (memory_value != "" && mode_value != "") {

    if (memory_operation == 'x'){
      var temp = get_memory_mode_value_dec() * get_mode_value_dec();
    } else if (memory_operation == '/'){
      var temp = get_memory_mode_value_dec() / get_mode_value_dec();
    } else if (memory_operation == '+'){
      var temp = get_memory_mode_value_dec() + get_mode_value_dec();
    } else if (memory_operation == '-'){
      var temp = get_memory_mode_value_dec() - get_mode_value_dec();
    } 

    
    temp = parseInt(temp, 10);// Round the value by converting it to int

    if (mode == 'HEX'){
      mode_value = temp.toString(16).toUpperCase();
    } else if (mode == 'DEC'){
      mode_value = temp.toString(10);
    } else if (mode == 'OCT'){
      mode_value = temp.toString(8);
    } else if (mode == 'BIN'){
      mode_value = temp.toString(2);
    }

    console.log(mode_value);
    populate_results();
   
  }
}