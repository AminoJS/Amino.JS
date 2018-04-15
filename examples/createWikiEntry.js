//TODO: Make this better.

const env = require('./env');
const Amino = require('../index');
(async function(){
    const sid = await Amino.login(env.email, env.password);
    console.log(`SID: ${sid}`);  
    const yourWikiEntry = await Amino.createWikiEntry('x228793829', 'Amino.JS Rocks', 'A Lib. Post', 'C:\\Users\\moelr\\Amino.JS\\img.jpg')
    console.log(yourWikiEntry);
    const deletedWikiEntry = await Amino.deleteWikiEntry('x228793829', yourWikiEntry.item.itemid);
    console.log(deletedWikiEntry);
})();