const env = require('./env');

const Amino = require('../index');

(async function() {
    await Amino.login(env.email, env.password);
    let wiki = await Amino.createWikiEntry('x228793829', 'Title', 'WOW SUCH WIKI', '\/home\/rob\/Downloads\/sample.png');
    console.log(wiki);
    await Amino.commentWikiEntry('x228793829', wiki.item.itemid, 'no you!');
})();