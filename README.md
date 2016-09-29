node-dbshell
============
[Gist](https://gist.github.com/manu29d/2df6a6cb2cbbac8e13c6f512db61d0ad)<br />
This is a script to provide db shell for [generator-angular-fullstack](https://www.npmjs.org/package/generator-angular-fullstack) with mongoose.<br />
It loads all your models and their schemas as defined with mongoose along with your config and establishes a databse connection to mongodb as defined by the config.<br />
After loading the shell you can run [mongoose queries](http://mongoosejs.com/docs/queries.html) on your models like<br />
```javascript
	var users = User.find(function(e,d){
    	console.log(d);
  	});
```
  
 <h3>How to use</h3>
 1. Include `console.js` file in the root folder of your project.
 2. Make sure the config paths are correct.
 3. Run this file as `node console.js`
