'use strict';
/****************** 
          *                                             *
                                               *
                    *
                                  *
                                                            *
         *
                                                  *
             *
                           *             *
                                                     *
      *                                                               *
               *
                               (             )
                       )      (*)           (*)      (
              *       (*)      |             |      (*)
                       |      |~|           |~|      |          *
                      |~|     | |           | |     |~|
                      | |     | |           | |     | |
                     ,| |a@@@@| |@@@@@@@@@@@| |@@@@a| |.
                .,a@@@| |@@@@@| |@@@@@@@@@@@| |@@@@@| |@@@@a,.
              ,a@@@@@@| |@@@@@@@@@@@@.@@@@@@@@@@@@@@| |@@@@@@@a,
             a@@@@@@@@@@@@@@@@@@@@@' . `@@@@@@@@@@@@@@@@@@@@@@@@a
             ;`@@@@@@@@@@@@@@@@@@'   .   `@@@@@@@@@@@@@@@@@@@@@';
             ;@@@`@@@@@@@@@@@@@'     .     `@@@@@@@@@@@@@@@@'@@@;
             ;@@@;,.aaaaaaaaaa       .       aaaaa,,aaaaaaa,;@@@;
             ;;@;;;;@@@@@@@@;@      @.@      ;@@@;;;@@@@@@;;;;@@;
             ;;;;;;;@@@@;@@;;@    @@ . @@    ;;@;;;;@@;@@@;;;;;;;
             ;;;;;;;;@@;;;;;;;  @@   .   @@  ;;;;;;;;;;;@@;;;;@;;
             ;;;;;;;;;;;;;;;;;@@     .     @@;;;;;;;;;;;;;;;;@@@;
         ,%%%;;;;;;;;@;;;;;;;;       .       ;;;;;;;;;;;;;;;;@@;;%%%,
      .%%%%%%;;;;;;;@@;;;;;;;;     ,%%%,     ;;;;;;;;;;;;;;;;;;;;%%%%%%,
     .%%%%%%%;;;;;;;@@;;;;;;;;   ,%%%%%%%,   ;;;;;;;;;;;;;;;;;;;;%%%%%%%,
     %%%%%%%%`;;;;;;;;;;;;;;;;  %%%%%%%%%%%  ;;;;;;;;;;;;;;;;;;;'%%%%%%%%
     %%%%%%%%%%%%`;;;;;;;;;;;;,%%%%%%%%%%%%%,;;;;;;;;;;;;;;;'%%%%%%%%%%%%
     `%%%%%%%%%%%%%%%%%,,,,,,,%%%%%%%%%%%%%%%,,,,,,,%%%%%%%%%%%%%%%%%%%%'
       `%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%'
           `%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%'
                  """"""""""""""`,,,,,,,,,'"""""""""""""""""
                                 `%%%%%%%'
                                  `%%%%%'
                                    %%%     Happy Birthday Manu :D
                                   %%%%%
                                .,%%%%%%%,.
                           ,%%%%%%%%%%%%%%%%%%%,

 ******************/
// Run this file as `[NODE_ENV=env] node dbShell.js [./path/to/config/file] [./path/to/models/directory]`

var repl = require('repl'),
	path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose');

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Start repl with default config.
var context = repl.start({}).context,
	ctx = {};

// Load the config
var configPath = process.argv[2] || './lib/config/config',
	config = require(configPath.replace(/\.js/, ''));
	ctx.config = config;


// Connect the db according to config
mongoose.connect(config.mongo.uri, config.mongo.options);


// Requiring all Models.
var modelsPath = path.join(__dirname, (process.argv[3] || './lib/models'));

fs.readdirSync(modelsPath).forEach(function (file) {
  if (/(.*)\.(js$|coffee$)/.test(file)) {
    require(modelsPath + '/' + file);
  }
});

// Merging repl.context with ctx to make it available in stdin.

for (var property in ctx) {
	context[property] = ctx[property];
}

for (var model in mongoose.models) {
	context[model] = mongoose.models[model];
}
