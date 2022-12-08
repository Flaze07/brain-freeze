const output = document.getElementById("output")
const editor = document.getElementById("editor")
const input = document.getElementById("input")

class BFInterpreter {
    constructor() {
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
        const tokens = this.clean(codes)
        const succeed = this.parse(tokens)

        if(!succeed) {
            //TODO: handle showing errors
            return
        }
    }

    clean(codes) {
        return codes.filter(e => ",.<>[]-=".includes(e))
    }

    parse(tokens) {
        this.loopStack = []
        this.loopPair.clear()
        /**
         * using every because forEach is unable to return a value and stops execution
         */
        const succeed = tokens.every((token, index) => {
            if(token == "[") {
                this.loopStack.push(index)
            } else if(token == "]") {
                if(this.loopStack.length == 0) {
                    return false
                }
                const loopCloseToken = this.loopStack.pop()
                
                this.loopPair.set(index, loopCloseToken)
                this.loopPair.set(loopCloseToken, index)
            }
        })

        return succeed
    }
}

const intrepeter = new BFInterpreter()

document.getElementById("run").onclick = () => {
    intrepeter.interpret(Array.from(input.textContent))
}