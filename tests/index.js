let should = require('chai').should(),
	index = require('../index.js');
	testingconfig = require('./config/')
	login = index.login;

describe('#login', function () {
		it('checking login..', function() {
			login(testconfig.amino.email, testconfig.amino.password, testconfig.amino.deviceID)
		})
})