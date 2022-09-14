class YoError extends Error {
    constructor(...data) {
        super(...data);
        this.name = `YoError`;
    }
}

module.exports = YoError;