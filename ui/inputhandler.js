class InputStream {
    /**
     * 
     * @param {HTMLInputElement} input 
     */
    constructor(input) {
        this.inputIndex = 0
        this.inner = input
    }

    readByte() {
        inputIndex = inputIndex + 1
        return this.inner.textContent[inputIndex - 1]
    }
}