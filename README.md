node-dbshell
============
[Gist](https://gist.github.com/manu29d/ced4a558abf2fa654bff)<br />
This is a script to provide db shell for [generator-angular-fullstack](https://www.npmjs.org/package/generator-angular-fullstack) with mongoose.<br />
It loads all your models and their schemas as defined with mongoose along with your config and establishes a databse connection to mongodb as defined by the config.<br />
After loading the shell you can run [mongoose queries](http://mongoosejs.com/docs/queries.html) on your models like<br />
```javascript
	var users = User.find(function(e,d){
    	console.log(d);
  	});
```
  
 <h3>How to use</h3>
 1. Include this file in your applications folder.
 2. Make sure the config paths are correct.
 3. Run this file as `[NODE_ENV=env] node dbShell.js [/path/to/config/file] [/path/to/models/directory]`