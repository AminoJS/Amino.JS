const fetch = require('isomorphic-fetch');
const endpoints = require('../helpers/endpoints.js'); //For Creating shorter URL's in this Module
const sorter = require('../helpers/sorter.js'); //For easier Sorting of various Responses.
const objs = require('../helpers/objects.js'); //For Storing the Objects that the Framework returns. 
const { getConfig } = require('../index');

/**
 * Loads Favorite Members
 * @param {SecurityString} sid For authenticating with the Narvii-API.
 * @param {CommunityUUID} com A ID that can be obtained by the function getJoinedComs
 * @returns {Object} Object with all the Members that the Logged-in User has in the Favorite Members Area in an Array.
 */

module.exports = async function getFavoriteMembers(com, count) {
    let membersList = objs.favoriteMembers;
    if(count == undefined){
        count = 20;
    }
    membersList.members = [];
    const sid = getConfig('sid');
    if (typeof sid != 'string' || typeof com !== 'string') {
        throw new Error('All Arguments are not satisfied.');
    }
    try{
        const response = await fetch(endpoints.getFavoriteMembers(com, count), {
            headers: {
                'NDCAUTH': `sid=${sid}`
            }
        });
        //Parsing the Response.
        const body = await response.json();
        body.userProfileList.forEach((element) => {
            //Sorting the Elements and pushing them into the Array.
            membersList.members.push(sorter.favoriteMembersSorter(element));
        });
        membersList.status = 'ok';
        membersList.error = null;
    }
    catch(err){
        membersList.error = err;
        throw 'Error while calling getFavoriteMembers: ' + err;
    }
    return membersList;
};