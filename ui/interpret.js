const output = document.getElementById("output")
const editor = document.getElementById("editor")
const input = document.getElementById("input")

class BFInterpreter {
    constructor() {
        this.stackIndex = 0
        this.stack = Array(30000).fill(0)
        this.loopPair = new Map()
    }

    /**
     * 
     * @param {Array} codes 
     * @param {*} input 
     * @param {*} output 
     */
    interpret(codes, input, output) {
        /**
         * initiate stack for code execution
         */
        this.stack = this.stack.map(e => 0)
        this.stackIndex = 0

        const tokens = this.clean(codes)
        const {succeed, error} = this.parse(tokens)

        if(!succeed) {
            output.writeError(error)
            return
        }

        this.execute(tokens, input, output)
    }

    clean(codes) {
        return codes.filter(e => ",.<>[]-+".includes(e))
    }

    parse(tokens) {
        const loopStack = []
        this.loopPair.clear()
        let error = ""
        /**
         * using every because forEach is unable to return a value and stops execution
         */
        const succeed = tokens.every((token, index) => {
            if(token == "[") {
                loopStack.push(index)
            } else if(token == "]") {
                if(loopStack.length == 0) {
                    error = `Error at index: ${index} close loop without opening`
                    return false
                }
                const loopCloseToken = loopStack.pop()
                
                this.loopPair.set(index, loopCloseToken)
                this.loopPair.set(loopCloseToken, index)
            }
            return true
        })

        return {succeed, error}
    }

    execute(tokens, input, output) {
        for(let i = 0; i < tokens.length; ++i) {
            const token = tokens[i]
            if(token == '.') {
                output.writeByte(this.stack[this.stackIndex])
            } else if(token == ',') {
                this.stack[this.stackIndex] = input.readByte()
            } else if(token == '+') {
                this.stack[this.stackIndex]++
                if(this.stack[this.stackIndex] > 255) {
                    //TODO: HANDLING STACK INDEX VALUE GOING OVER THE LIMIT
                }
            } else if(token == '-') {
                this.stack[this.stackIndex]--
                if(this.stack[this.stackIndex] < 0) {
                    //TODO: HANDLING NEGATIVE STACK INDEX VALUE
                }
            } else if(token == '<') {
                this.stackIndex--
                if(this.stackIndex < 0) {
                    //TODO: HANDLING ERROR MADE BY TRYING TO GO TO NEGATIVE STACK INDEX
                }
            } else if(token == '>') {
                this.stackIndex++
                if(this.stackIndex >= 30000) {
                    //TODO: HANDLING ERROR MADE BY GOING OVER THE STACK COUNT
                }
            } else if(token == '[') {
                if(this.stack[this.stackIndex] == 0) {
                    i = this.loopPair.get(i)
                }
            } else if(token == ']') {
                if(this.stack[this.stackIndex] != 0) {
                    i = this.loopPair.get(i)
                }
            }
        }
    }
}

const intrepeter = new BFInterpreter()

document.getElementById("run").onclick = () => {
    const input = document.getElementById("input")
    const inputstream = new InputStream(input)

    const output = document.getElementById("output")
    const outputStream = new OutputStream(output)
    outputStream.clear()

    const codeString = document.getElementById("editor").textContent
    const codeArr = Array.from(codeString)
    
    intrepeter.interpret(codeArr, inputstream, outputStream)
}