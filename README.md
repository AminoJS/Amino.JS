# Amino.JS [![Build Status](https://travis-ci.org/AminoJS/Amino.JS.svg?branch=master)](https://travis-ci.org/AminoJS/Amino.JS)

![Amino](https://pm1.narvii.com/6354/a293fd6d1f40df3bdd0a1211ad395fcfc1fd0def_hq.jpg)

Amino.JS is a Javascript library for access to the Narvii/Amino API.

## Getting Started

To start using this library is easy.
First include it on your project
```js
var Amino = require("amino.js");
```
From here, you can choose 2 options.
Use the modules directly
```js
const sid = await Amino.login('email', 'password');
// Remember, theses functions are async, so you need to use it on a async context
// Also, you have to catch the exceptions by yourself
```
Or use the framework
```js
const AminoAPI = new Amino.AminoAPI();
AminoAPI.proccessAction(Amino.login('email', 'password'), function(data){
    // Here is the success handler
}, function(error){
    // Here is the error handler
});
// Differently than the direct call, you can use the framework in a normal context(outside of a async context)
```

### Prerequisites

The only prerequisite for using the Amino.JS library is the Node.JS itself.
> Levi: i made a test, using a experimental build of the Node.JS for android, and i tested the Amino.JS library on it. It worked perfectly(despite a small lag due to my phone not being a pretty good one)

### Installing

Install this library is easy as
```
$ npm install amino.js
```

Or simply by cloning this repo

## Running the tests

To run the tests, you need to install the Jest library
```
$ npm install -g jest
```

Each test make sure that the modules and calls are working together to the Narvii Amino, making sure it isn't causing any type of problem(like calling a inexistent endpoint)

## Deployment

To deploy, it's recommended to make a handler for the SID(Session ID), to avoid any type of session leaking, or session hijack.

## Built With

* [Isomorphic Fetch](https://www.npmjs.com/package/isomorphic-fetch) - Fetch for node and Browserify. Built on top of [GitHub's WHATWG Fetch polyfill](https://github.com/github/fetch).
* A lot of coffee
* A brand-new used laptop

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

* **[Robin Möller (moelrobi)](https://github.com/moelrobi)** - Initial Work
* **[Felix Fong (felixfong227)](https://github.com/felixfong227)**
* **[Tau (Tau5)](https://github.com/Tau5)**
* **[Jason Idris (coffeeboo)](https://github.com/coffeeboo)**
* **[Akatsuki Levi (akatsukilevi)](https://github.com/akatsukilevi)**

See also the list of [contributors](https://github.com/AminoJS/Amino.JS/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* This software is unofficial! It's against the Terms of Service to use this Software to interact with Amino APIs. We (the creator of Amino.JS) are not responsible for any kind of damage (ban / legal actions) done by Narvii, Inc. 
* UPDATE:
> Levi: I'm currently trying to make this API official in the AminoApps. Even though time isn't helping me much, i'll be working to make it official.
* We are not responsible for any usage you have with the API due to improper usage