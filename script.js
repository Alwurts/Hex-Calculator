// Clears the screen on click of C button.
function clearScreen() {
    document.getElementById("result").value = "";
  }
  // Displays the entered value on screen.
  function liveScreen(value) {
    document.getElementById("result").value += value;
  }
  // Swaps the style sheet in order to  achieve dark mode.
  function switchTheme() {
    let darkMode = document.getElementById("dark-mode");
    let theme = document.getElementById("theme");
    if (theme.getAttribute("href") == "light.css") {
      theme.href = "dark.css";
      darkMode.innerHTML = "Light Mode 🌙";
    } else {
      theme.href = "light.css";
      darkMode.innerHTML = "Dark Mode 🌙";
    }
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