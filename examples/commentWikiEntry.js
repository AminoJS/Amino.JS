console.log('Creating a Wiki Entry and then commenting on it.');

//Loading the Enviroment File for authentication. 
const env = require('./env');

//Loading the Libary
const Amino = require('../index');

(async function() {
    //Logging into the API.
    await Amino.login(env.email, env.password);
    //Wow such Wiki... (see ./createWikiEntry)
    let wiki = await Amino.createWikiEntry(env.wiki.comid, env.wiki.title, env.wiki.content, env.wiki.img_path);
    console.log(`You just Posted a Wiki with the Title: ${wiki.item.title}`);
    /**
     * Uncomment for raw Response!
     * console.log('===RAW LIBARY RESPONSE===')
     * console.log(wiki);
     */
    if(env.wikiComment.img_path == 'optional') return await Amino.commentWikiEntry(env.wiki.comid, wiki.item.itemid, env.wikiComment.content);
    else return await Amino.commentWikiEntry(env.wiki.comid, wiki.item.itemid, env.wikiComment.content, env.wikiComment.img_path);
})();