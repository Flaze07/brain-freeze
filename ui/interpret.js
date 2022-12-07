const output = document.getElementById("output")
const editor = document.getElementById("editor")

function interpret() {
    output.textContent = "";
    stack = stack.map(() => 0)
    const codes = Array.from(editor.textContent).filter(e => ".,<>[]+-".includes(e))
    bfInterpreter(codes)
}

function bfInterpreter(codes) {
    let stackIndex = 0;
    let inputIndex = 0;
    for(let i = 0; i < codes.length; ++i) {
        const code = codes[i]
        if(code == '.') {
            output.textContent += chr(stack[stackIndex])
        } else if(code == ',') {
            //TODO: implement input
        } else if(code == '<') {
            stackIndex--
            if(stackIndex < 0) {
                alert(`Error on ${i}, trying to access stack on negative index`)
                return
            }
        } else if(code == '>') {
            stackIndex++
            if(stackIndex >= stack.length) {
                alert(`Error on ${i}, out of range`)
            }
        } else if(code == '+') {
            stack[stackIndex]++
        } else if(code == '-') {
            stack[stackIndex]--
        } else if(code == '[') {
            //TODO: implement loop
        } else if(code == ']') {
            //TODO: implement loop
        }
    }
}

document.getElementById("run").onclick = interpret