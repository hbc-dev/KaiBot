class YoError extends Error {
    constructor(...data) {
        super(...data)

        this.name = '[Yo-Error]'
    }
}

module.exports = YoError;