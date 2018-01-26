let prefix = 'http://service.narvii.com/api/';

module.exports = {
	login: prefix + 'v1/g/s/auth/login',
	loadChat:(com, uuid, count) => {return `${prefix}/v1/${com}/s/chat/thread/${uuid}/message?start=0&size=${count}&cv=v1.2`}
}