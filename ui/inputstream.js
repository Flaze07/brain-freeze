class InputStream {
    /**
     * 
     * @param {HTMLElement} input 
     */
    constructor(input) {
        this.inputIndex = 0
        this.inner = input
    }

    readByte() {
        inputIndex = inputIndex + 1
        return ord(this.inner.textContent[inputIndex - 1])
    }
}