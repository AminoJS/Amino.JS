---
layout: post
title:  "getJoinedComs(sid)"
date:   2018-03-24 20:00:36 -0400
categories: jekyll update
---
*Get a JSON object of all the communities you are in, and their information.*

| Name  | Type           | Description                             |
|-------|----------------|-----------------------------------------|
| `sid` | SecurityString | For authenticating with the Narvii-API. |

**Returns:** Array of community objects.

{% highlight javascript %}
coms[0] = {
    "id": "x159192087",
    "name": "German Roleplay Community",
    "url": "https://aminoapps.com/c/german-roleplay-community/"
}
{% endhighlight %}
