console.log('Creates a Wiki Entry and instantly destorys / deletes it again.');

//Loading Enviroment File for authentication.
const env = require('./env');

//Loading the Variable
const Amino = require('../index');

//Fail Check the Enviroment file
if(env.wiki.comid == '' || env.wiki.title == '' || env.wiki.content == '' || env.wiki.img_path == '') {
    throw new Error('Enviroment File has not given all Operators. Please fix.')
}

(async function(){
    //Logging into Amino with given credentials.
    const sid = await Amino.login(env.email, env.password);
    console.log(`SID: ${sid}`);
    //Creating a Wiki Entry in a given Community.
    const yourWikiEntry = await Amino.createWikiEntry(env.wiki.comid, env.wiki.title, env.wiki.content, env.wiki.img_path);
    //Printin out the Libary Response
    console.log(`You just Posted a Wiki with the Title: ${yourWikiEntry.item.title}`);
    
    console.log('===RAW LIBARY RESPONSE===')
    console.log(yourWikiEntry);

    //Deleting the Wiki Entry you just created above.
    const deletedWikiEntry = await Amino.deleteWikiEntry(env.wiki.comid, yourWikiEntry.item.itemid);
    //Returning True / False if Completed!
    console.log(deletedWikiEntry);
})();