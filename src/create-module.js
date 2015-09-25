var tools = require('../utils/tools');
var route = require('./create-route');
var resource = require('./create-resource');

function createModule(moduleName, localPaths, exportPaths) {
	// Frontend
	var folder = localPaths.frontend + moduleName + '/';
	tools.basic.createFolder(folder, fn_frontend, folder, moduleName);
	setTimeout(function (moduleName) {
		route.create('home', moduleName, localPaths);
	}, 500, moduleName);

	// www folder
	var www = './' + exportPaths.index + '/' + moduleName + '/';
	tools.basic.createFolder(www, fn_www, www);

	// Resources
	resource.create(moduleName, localPaths);

	// Update Gruntfile
	tools.basic.updateFile('Gruntfile.js', './', 'Gruntfile.js', "'" + moduleName + "',");

	// Function 1
	function fn_frontend(folder, moduleName) {
		tools.createFileWithTemplate('app.js', folder, moduleName + 'App.js', {
			module: moduleName
		});
	}
	
	// Function 2
	function fn_www(folder) {
		tools.createFileWithTemplate('index.html', folder, 'indexDev.html', {
			version: 'dev',
			module: moduleName,
			build: exportPaths.build
		});
		tools.createFileWithTemplate('index.html', folder, 'indexDist.html', {
			version: 'dist',
			module: moduleName,
			build: exportPaths.build
		});
	}
	
}

module.exports.create = createModule;