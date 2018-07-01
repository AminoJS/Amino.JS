---
layout: post
title:  "getJoinedChats(sid, com)"
date:   2018-03-24 20:00:36 -0400
categories: jekyll update
---
*Load information about chats the user is in.*

| Name  | Type           | Description                                             |
|-------|----------------|---------------------------------------------------------|
| `sid` | SecurityString | For authenticating with the Narvii-API.                 |
| `com` | CommunityUUID  | A ID that can be obtained by the function getJoinedComs |

**Returns:** An array of chat objects.

{% highlight javascript %}
threads[0] = {
	'threadId': '<A Random UUID>',
	'memberCount': 59,
	'title': 'Laberchat für alle',
	'joined': true,
	'public': false,
	'group': true,
	'muted': false,
	'unread': true,
	'lastMessage': {
  		'senderId': 'A UserID',
  		'message': 'The Last Message sent to the Channel'
 	},
	'members': 'still Raw JSON from the API!'
}
{% endhighlight %}
