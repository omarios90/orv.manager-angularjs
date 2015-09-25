var tools = require('../utils/tools');
var resource = require('./create-resource');

function createProject(projectName, localPaths, exportPaths) {

	// Creating folders
	tools.basic.createFolder(localPaths.frontend);
	tools.basic.createFolder(localPaths.utils, fn_utils);
	tools.basic.createFolder(localPaths.base, fn_resources);

	// Creating files
	tools.basic.createFile('./README.md', '');
	tools.createFileWithTemplate('Gruntfile.js', './', 'Gruntfile.js', {
		project: projectName,
		destination: exportPaths.index + '/' + exportPaths.build
	});
	tools.createFileWithTemplate('package.json', './', 'package.json', {
		project: projectName
	}, fn_npm);
	tools.createFileWithTemplate('bower.json', './', 'bower.json', {
		project: projectName
	}, fn_bower);
	
	// Copying files
	tools.basic.copyFolder(tools.constants.paths.grunt, './grunt/');

	// Function 1
	function fn_utils() {
		tools.basic.copyFolder(tools.constants.paths.utils, localPaths.utils);
		tools.createFileWithTemplate('init.js', localPaths.utils, '_init.js', {
			module: 'utils'
		});
	}

	// Function 2
	function fn_resources() {
		resource.create('base', localPaths);
	}
	
	// Function 3
	function fn_npm() {
		tools.basic.shell.exec('npm install');
	}
	
	// Function 4
	function fn_bower() {
		tools.basic.shell.exec('bower install');
	}
}

module.exports.create = createProject;