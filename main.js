var inquirer = require("inquirer");
var controllers = require("./src/create-controller");
var directives = require("./src/create-directive");
var modules = require("./src/create-module");
var projects = require("./src/create-project");
var resources = require("./src/create-resource");
var routes = require("./src/create-route");
var services = require("./src/create-service");
var templates = require("./src/create-template");

function createApp(projectName, exportPaths) {

	var localPaths = {
		proj: './' + projectName + '/',
		frontend: './' + projectName + '/frontend/',
		resources: './' + projectName + '/resources/',
		utils: './' + projectName + '/resources/utils/',
		base: './' + projectName + '/resources/base/'
	};

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
			'service',
			'* CANCEL *'
		]
	}], function (answers) {

		switch (answers.choice) {
			case 'project':
				projects.create(projectName, localPaths, exportPaths);
				break;
			case 'module':
				inquirer.prompt([{
					type: 'input',
					name: 'module',
					message: 'Module name'
				}], function (answers) {
					modules.create(answers.module, localPaths, exportPaths);
				});
				break;
			case 'resource':
				inquirer.prompt([{
					type: 'input',
					name: 'module',
					message: 'Resource name'
				}], function (answers) {
					resources.create(answers.module, localPaths);
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
					}], function (answers) {
						routes.create(answers.name, answers.module, localPaths);
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
					}], function (answers) {
						templates.create(answers.name, answers.module, localPaths);
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
					}], function (answers) {
						directives.create(answers.name, answers.module, localPaths);
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
					}], function (answers) {
						controllers.create(answers.name, answers.module, localPaths);
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
					}], function (answers) {
						services.create(answers.name, answers.module, localPaths);
					});
				break;
		}
	});

}

exports.start = function(parameters) {
	createApp(parameters.project, parameters.paths);
};