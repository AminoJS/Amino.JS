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

    /*
    * Helper to execute Amino.JS calls
    * The Amino.JS calls are async, who makes their handling a bit complex to new users
    * This helper make it easier to use theses functions
    * @param {AminoAction} action The function who will be executed
    * @param {Callback} resultHandler The function who will be called after the function promise resolve. Note that the function result will be returned as the only argument
    * @param {Callback} errorHandler The function who will be called if the function promise reject. Note that the function error will be returned as the only argument
    */
    proccessAction(action, resultHandler, errorHandler){
        action.then(result => {
            resultHandler(result);
        }).catch(err => {
            errorHandler(err);
        });
    }
}

module.exports = AminoAPI;