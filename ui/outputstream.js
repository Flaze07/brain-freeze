class OutputStream {
    /**
     * 
     * @param {HTMLElement} output 
     */
    constructor(output) {
        this.inner = output
    }

    clear() {
        this.inner.textContent = ""
    }

    writeByte(byte) {
        const charForm = chr(byte)
        this.inner.textContent += charForm
    }
}