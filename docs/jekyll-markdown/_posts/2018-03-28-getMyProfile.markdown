---
layout: post
title:  "getMyProfile(sid)"
date:   2018-03-24 20:00:36 -0400
categories: jekyll update
---
*Get a simplefied JSON object of your profile in Amino.*

| Name  | Type           | Description                             |
|-------|----------------|-----------------------------------------|
| `sid` | SecurityString | For authenticating with the Narvii-API. |

**Returns:** Your profile in a JSON response.

**Note:** mediaList is taken straight from the API.

{% highlight javascript %}
{
    account: {
        uid: '516e2361-f357-4cac-a531-07e4c8924064',
        username: 'Lelouch',
        mediaList: [
            [100,
                'http://pm1.narvii.com/6781/7d586df7ad9d181b7a2ef219f98a15c765c9e080v2_00.jpg',
                null
            ]
        ],
        icon: 'http://pm1.narvii.com/6759/0b6a0092b6d860fb664c199ad8f791ad3f764b95v2_00.jpg'
    },
    status: 'ok',
    error: null
}
{% endhighlight %}
