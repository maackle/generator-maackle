'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var MaackleGenerator = module.exports = function MaackleGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(MaackleGenerator, yeoman.generators.Base);

MaackleGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    type: 'confirm',
    name: 'someOption',
    message: 'Would you like to enable this option?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.someOption = props.someOption;

    cb();
  }.bind(this));
};

MaackleGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/layout');
  this.mkdir('app/sass');
  this.mkdir('app/coffee');

  this.mkdir('www');
  this.mkdir('www/assets');
  this.mkdir('www/assets/vendor');

  var copyover = [
    '.bowerrc',
    'package.json',
    'bower.json',
    'Gruntfile.coffee',
  ];

  for (var c in copyover) {
    var file = copyover[c];
    this.copy(file, file);
  }

  this.copy('main.scss', 'app/sass/main.scss');
  this.copy('index.jade', 'app/index.jade');
  this.copy('_base.jade', 'app/layout/_base.jade');
  // this.copy('coffee', 'app/coffee');

};

MaackleGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
