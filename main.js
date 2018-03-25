// load the things we need
var bodyParser = require('body-parser');
var http = require('http');
var express = require('express');
var amino = require('./AminoAPI/AminoAPI.js');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// set the view engine to ejs
app.set('view engine', 'ejs');

// define /public as a public folder, so we can include css and other things on the EJS files
app.use(express.static(__dirname + '/public'));

// use res.render to load up an ejs view file

let userSID;
let userProfile;

// index page 
app.get('/', function(req, res) {
	if(req.param('err')){
		res.render('pages/login', { 'error' : true });
	} else{
		res.render('pages/login', { 'error' : false });	
	}
});

app.post('/api/auth/login', function(req, res) {
    var usr = req.body.Username;
    var pwd = req.body.Password;
	
	let userToken = amino.login(usr, pwd, "01D5ED5BE317F883719728B66E5D9D7A21BF3596050F95AAB9BC707D2D82AF6F82DFDEF9B1CF305A90");
	
	userToken.then(function(result) {
		userSID = result.sid;
		userProfile = result;
		res.redirect('/amino/home');
	}).catch(err => {
		res.redirect('/?err');
	});
	
});

app.get('/amino/home', function(req, res) {
	var userNick = userProfile.account.nickname;
	var userIcon = userProfile.account.icon;
	var userCover = userProfile.account.mediaList[0][1];
	let getComs = amino.getJoinedComs(userSID);
	getComs.then(function(comm) {
		res.render('pages/amino/home', {
			communities: comm.coms,
			nickname: userNick,
			icon: userIcon,
			cover: userCover
		});
	});
});

/* ------------------------------------- SOCKET.IO */
io.on('connection', function (socket) {		
	socket.on('getChats', function (data) {
		let currentChats = amino.getJoinedChats(userSID, data.comm);
		currentChats.then(function(results) {
			socket.emit('getChatsReply', { 'chats' : results });
		});
	});
});
/* ------------------------------------- SOCKET.IO */

server.listen(8080, function(){
 console.log('App listening at http://localhost:8080');
});