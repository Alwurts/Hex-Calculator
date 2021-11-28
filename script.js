let mode = "HEX"
let mode_value = ""



// Clears the screen on click of C button.
function clearScreen() {
    document.getElementById("result-HEX").value = "";
    document.getElementById("result-DEC").value = "";
    document.getElementById("result-OCT").value = "";
    document.getElementById("result-BIN").value = "";
    mode_value = ""
}

function populate_results (){
  
  if (mode == 'HEX'){
    var dec_value = parseInt(mode_value, 16);
  } else if (mode == 'DEC'){
    var dec_value = parseInt(mode_value, 10);
  } else if (mode == 'OCT'){
    var dec_value = parseInt(mode_value, 8);
  } else if (mode == 'BIN'){
    var dec_value = parseInt(mode_value, 2);
  }  

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
  console.log(mode_value)
  if (mode_value != ""){
    mode_value = mode_value.substring(0,mode_value.length - 1)

    populate_results()
  }
  
}


function switchMode(received_mode) {

  // When switching change the mode_value to the new mode
  if (mode == 'HEX'){
    var dec_value = parseInt(mode_value, 16);
  } else if (mode == 'DEC'){
    var dec_value = parseInt(mode_value, 10);
  } else if (mode == 'OCT'){
    var dec_value = parseInt(mode_value, 8);
  } else if (mode == 'BIN'){
    var dec_value = parseInt(mode_value, 2);
  } 

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
  console.log("Mode  value after switching: " + mode_value)

}

// Turns a string equation into a value eg '2*2 + 4' will return '8'
function calcString(input) {
    const values = input.split("");
    const out = [];
    const ops = [];
    const allOps = ["*", "/", "+", "-", ")", "("];

    let num = "";
    for(let index = 0; index < values.length; index++){
    const v = values[index];
        if(v === " ") {
          continue;
        }
      if(!allOps.includes(v)){
        while(!allOps.includes(values[index]) && values[index] !== " " && index < values.length){
          num += values[index];
                 index ++;
        }
        index--;
      out.push(num);
      num = "";
        continue;
      }          

            if (v === ")"){
                let top = ops.pop();

                while(top !== "(" && ops.length) {
                    out.push(top);
                    top = ops.pop();

                }
                if(top !== "("){
                    return "Mismatched parens"
                }
              continue;
            }
            if(ops.length && v !== "(") {
                let top = ops[ops.length - 1];
                let topP = getPrecedence(top);
                const currP = getPrecedence(v);

              while(currP >= topP && top !== "(" && ops.length) {

                out.push(top)
                ops.pop();
                top = ops[ops.length - 1];
                topP = getPrecedence(top);

              }

            } 
            ops.push(v);


    }
    while(ops.length) {
            out.push(ops.pop());
    }
    const stack = [];
    out.forEach((o)=>{
      if(!allOps.includes(o)){
        stack.push(parseFloat(o, 10));
      } else {
        const r = stack.pop();
        const l = stack.pop();
        switch(o) {
          case "+":
            stack.push(l+r);
            break;
          case "-":
            stack.push(l-r);
            break;
          case "*":
            stack.push(l*r);
            break;
          case "/":
            stack.push(l/r);
            break;
        }
      }
    })

  return ""+stack[0]

}
function getPrecedence(value) {
    const precedence = [["("], ["*", "/"], ["+", "-"]];
    return precedence.findIndex((p)=> {
        return p.includes(value);
    })
}
