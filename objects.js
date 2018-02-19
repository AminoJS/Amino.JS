/**
 * @module Objects_KiFrame
 * @author RobStyling
 * @version v.0.1
 * @beta
 */

/**
 * @example
 * coms[0] = {
 *     "id": "x159192087",
 *     "name": "German Roleplay Community",
 *     "url": "https://aminoapps.com/c/german-roleplay-community/"
 * }
 */
const communityList = {
    coms: [],
    status: 'not ok',
    error: 'there has been nothing done with the Object.'
};

module.exports = {
    communityList,
    threadList: {
        threads: [],
        status: 'not ok',
        error: 'not everything defined'
    },

    sendingMessage: {
        message: {
            sent: false,
            message: 'defaults with begining of method. if not. may god help you.',
            threadId: 'defaults with begining of method. if not. may god help you.'
        },
        status: 'not ok',
        error: 'Nothing has been done.'
    },

    recivedMessages: {
        messages: [],
        status: 'not ok',
        error: 'nothing happend'
    }
};