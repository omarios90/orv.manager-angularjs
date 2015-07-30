// Dependencies
var mkdirp = require('mkdirp');
var fs = require('fs');
var inquirer = require("inquirer");
var ncp = require('ncp').ncp;
var terminal = require('child_process').spawn('bash');

// ORV Part
var AngularJS = {
	paths: {
		temp: './node_modules/orv.manager-angularjs/patterns/',
		utils: './node_modules/orv.manager-angularjs/patterns/utils/',
		grunt: './node_modules/orv.manager-angularjs/patterns/grunt/'
	},
	vars: {
		updatePhrase: '/*DONT_ERASE*/'
	},
	utils: function() {
		// Function to create a new file
		this.createFile = function(path, content) {
			fs.writeFile(path, content, 'utf8', function(err) {
				if (err) return console.log(err);
			});
		};
		// Function to read file
		this.readFile = function(path, callback) {
			fs.readFile(path, 'utf8', function(err, data) {
				if (err) return console.log(err);
				callback(data);
			});
		};
		// Function to create a new folder
		this.createFolder = function(path, callback, val1, val2, val3) {
			var shit = arguments;
			mkdirp(path, function(err) {
				if (err) return console.log(err);
				if (callback) callback(val1, val2, val3);
			});
		};
		// Function to copy folder
		this.copy = function(source, destination) {
			ncp.limit = 16;
			ncp(source, destination, function(err) {
				if (err) return console.log(err);
			});
		};
	},
	tools: function() {
		// Local variables
		var utils = new AngularJS.utils();

		this.template = template;
		this.updateFile = updateFile;
		this.updateFileWithTemplate = updateFileWithTemplate;

		// Function to use templates
		function template(source, dest, file, values) {
			utils.readFile(AngularJS.paths.temp + source, function(data) {
				for (var key in values) {
					if (values.hasOwnProperty(key)) {
						var regex = new RegExp('##' + key, 'g');
						data = data.replace(regex, values[key]);
					}
				}
				utils.createFile(dest + file, data);
			});
		};

		// Function to update files
		function updateFile(source, dest, file, value) {
			utils.readFile(source, function(data) {
				if (data.indexOf(AngularJS.vars.updatePhrase) > 0) {
					data = data.replace(AngularJS.vars.updatePhrase, value + AngularJS.vars.updatePhrase);
					utils.createFile(dest + file, data);
				}
			});
		};

		// Function to update file using another template to fill
		function updateFileWithTemplate(source, dest, templateFile, file, values) {
			utils.readFile(AngularJS.paths.temp + templateFile, function(data) {
				for (var key in values) {
					if (values.hasOwnProperty(key)) {
						var regex = new RegExp('##' + key, 'g');
						data = data.replace(regex, values[key]);
					}
				}
				updateFile(source, dest, file, data);
			});
		};

	},
	app: function(projectName, exportPaths) {
		// Local variables
		var paths = {
			proj: './' + projectName + '/',
			frontend: './' + projectName + '/frontend/',
			resources: './' + projectName + '/resources/',
			utils: './' + projectName + '/resources/utils/',
			base: './' + projectName + '/resources/base/'
		}

		// Managers
		var utils = new AngularJS.utils();
		var tools = new AngularJS.tools();

		// Menu
		this.start = function() {
			inquirer.prompt([{
				type: 'list',
				name: 'choice',
				message: 'What do you want to create?',
				choices: [
					'project',
					'module',
					'resource',
					'route',
					'template',
					'directive',
					'controller',
					'service'
				]
			}], function(answers) {

				switch (answers.choice) {
					case 'project':
						createProject();
						break;
					case 'module':
						inquirer.prompt([{
							type: 'input',
							name: 'module',
							message: 'Module name'
						}], function(answers) {
							createModule(answers.module);
						});
						break;
					case 'resource':
						inquirer.prompt([{
							type: 'input',
							name: 'module',
							message: 'Resource name'
						}], function(answers) {
							createResource(answers.module);
						});
						break;
					case 'route':
						inquirer.prompt([{
							type: 'input',
							name: 'module',
							message: 'Module name'
						}, {
							type: 'input',
							name: 'name',
							message: 'Route name'
						}], function(answers) {
							createRoute(answers.name, answers.module);
						});
						break;
					case 'template':
						inquirer.prompt([{
							type: 'input',
							name: 'module',
							message: 'Module name'
						}, {
							type: 'input',
							name: 'name',
							message: 'Template name'
						}], function(answers) {
							createTemplate(answers.name, answers.module);
						});
						break;
					case 'directive':
						inquirer.prompt([{
							type: 'input',
							name: 'module',
							message: 'Module name'
						}, {
							type: 'input',
							name: 'name',
							message: 'Directive name'
						}], function(answers) {
							createDirective(answers.name, answers.module);
						});
						break;
					case 'controller':
						inquirer.prompt([{
							type: 'input',
							name: 'module',
							message: 'Module name'
						}, {
							type: 'input',
							name: 'name',
							message: 'Controller name'
						}], function(answers) {
							createController(answers.name, answers.module);
						});
						break;
					case 'service':
						inquirer.prompt([{
							type: 'input',
							name: 'module',
							message: 'Module name'
						}, {
							type: 'input',
							name: 'name',
							message: 'Service name'
						}], function(answers) {
							createService(answers.name, answers.module);
						});
						break;
				}
			});
		}

		function createProject() {
			utils.createFolder(paths.frontend);
			utils.createFolder(paths.utils, fn_utils);
			utils.createFolder(paths.base, fn_resources);

			tools.template('package.json', './', 'package.json', {
				project: projectName
			});

			utils.createFile('./README.md', '');

			utils.copy(AngularJS.paths.grunt, './grunt/');
			tools.template('Gruntfile.js', './', 'Gruntfile.js', {
				project: projectName,
				destination: exportPaths.index + '/' + exportPaths.build
			});

			tools.template('bower.json', './', 'bower.json', {
				project: projectName
			});

			// Install bower
			terminal.stdin.write('bower install\n');

			// Install grunt
			terminal.stdin.write('npm install\n');
			terminal.stdin.end();

			// Functions
			function fn_utils() {
				utils.copy(AngularJS.paths.utils, paths.utils);
				tools.template('init.js', paths.utils, '_init.js', {
					module: 'utils'
				});
			}

			function fn_resources() {
				createResource('base');
			}
		}

		function createModule(module) {
			// Frontend
			var folder = paths.frontend + module + '/';
			utils.createFolder(folder, fn_frontend, folder, module);
			setTimeout(function(module) {
				createRoute('home', module);
			}, 500, module);

			// www folder
			var www = './' + exportPaths.index + '/' + module + '/';
			utils.createFolder(www, fn_www, www);

			// Resources
			createResource(module);

			// Functions
			function fn_frontend(folder, module) {
				tools.template('app.js', folder, module + 'App.js', {
					module: module
				});
			}

			function fn_www(folder) {
				tools.template('index.html', folder, 'indexDev.html', {
					version: 'dev',
					module: module,
					build: exportPaths.build
				});
				tools.template('index.html', folder, 'indexDist.html', {
					version: 'dist',
					module: module,
					build: exportPaths.build
				});
			}

			// Update Grunt
			tools.updateFile('Gruntfile.js', './', 'Gruntfile.js', "'" + module + "',");
		}

		function createRoute(name, module) {
			var base = paths.frontend + module + '/';
			var folder = base + name + '/';
			utils.createFolder(folder, fn_route, folder, name, module);

			// Update App
			tools.updateFileWithTemplate(base + module + 'App.js', base, 'routePart.js', module + 'App.js', {
				route: name
			});

			// Functions
			function fn_route(folder, name, module) {
				utils.createFile(folder + name + '.css', '');
				utils.createFile(folder + name + '.html', '');
				tools.template('controller.js', folder, name + 'Ctrl.js', {
					module: module,
					name: name
				});
			}

			terminal.stdin.end();
		}

		function createResource(module) {
			var base = paths.resources + module + '/';
			var res = [{
				name: module + 'Services',
				path: base + 'services/'
			}, {
				name: module + 'Directives',
				path: base + 'directives/'
			}, {
				name: module + 'Controllers',
				path: base + 'controllers/'
			}];

			for (var i = 0; i < res.length; i++) {
				utils.createFolder(res[i].path, fn_init, res[i]);
			}
			utils.createFolder(base + 'templates/', fn_style, base);
			utils.createFolder(base + 'libraries/', fn_style, base);

			// Functions
			function fn_init(resource) {
				tools.template('init.js', resource.path, '_init.js', {
					module: resource.name
				});
			}

			function fn_style(base) {
				utils.createFile(base + 'styles.css', '');
				utils.createFile(base + 'templates/' + module + '-demo.html', '');
			}

			terminal.stdin.end();
		}

		function createTemplate(name, module) {
			var folder = paths.resources + module + '/templates/' + name + '/';
			utils.createFolder(folder, fn_template, folder, name);

			// Functions
			function fn_template(folder, name) {
				utils.createFile(folder + name + '.css', '');
				utils.createFile(folder + name + '.html', '');
			}

			terminal.stdin.end();
		}

		function createDirective(name, module) {
			var folder = paths.resources + module + '/directives/' + name + '/';
			utils.createFolder(folder, fn_directive, folder, name);

			// Functions
			function fn_directive(folder, name) {
				tools.template('directive.js', folder, name + '.js', {
					module: module,
					name: name
				});
				utils.createFile(folder + name + '.html', '');
			}

			terminal.stdin.end();
		}

		function createController(name, module) {
			var folder = paths.resources + module + '/controllers/';

			tools.template('individualController.js', folder, name + '.js', {
				module: module,
				name: name
			});

			terminal.stdin.end();
		}

		function createService(name, module) {
			var folder = paths.resources + module + '/services/';

			tools.template('service.js', folder, name + '.js', {
				module: module,
				name: name
			});

			terminal.stdin.end();
		}

	},
	init: function(projectName, exportPaths) {
		var app = new AngularJS.app(projectName, exportPaths);
		app.start();
	}
};

exports.start = function(parameters) {
	AngularJS.init(parameters.project, parameters.paths);
};