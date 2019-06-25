class AminoAPI {
    constructor() {
        this.session_id = null;
    }
    set sessionId(sid) {
        this.session_id = sid;
    }
    get sessionId() {
        return this.session_id;
    }
    proccessAction(action, resultHandler, errorHandler){
        action.then(result => {
            resultHandler(result);
        }).catch(err => {
            errorHandler(err);
        });
    }
}

module.exports = AminoAPI;