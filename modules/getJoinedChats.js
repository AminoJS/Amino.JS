const fetch = require('isomorphic-fetch');
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const sorter = require('../helpers/sorter.js'); //For easier Sorting of various Responses.
const objs = require('../helpers/objects.js'); //For Storing the Objects that the Framework returns. 
const { getConfig } = require('../index');

/**
 * Loads all Kind of Chat Infomations that the Person itself joined.
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @param {CommunityUUID} com A ID that can be obtained by the function getJoinedComs
 * @returns {Object} Object where all the Chats that the Logged-in User has joined are contained in an Array.
 */

module.exports = async function getJoinedChats(com) {
    let threadList = objs.threadList;
    const sid = getConfig('sid');
    if (typeof sid != 'string' || typeof com !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    threadList.threads = [];
    try{
        const response = await fetch(endpoints.getJoinedChats(com), {
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        });
        //Parsing the Response.
        const body = await response.json();
        body.threadList.forEach((element) => {
            //Sorting the Elements and pushing them into the Array.
            threadList.threads.push(sorter.threadSort(element));
        });
        threadList.status = 'ok';
        threadList.error = null;
    }
    catch(err){
        threadList.error = err;
        throw 'Error while calling getJoinedChats: ' + err;
    }
    return threadList;
};