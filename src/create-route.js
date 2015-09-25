var tools = require('../utils/tools');

function createRoute(name, moduleName, localPaths) {
	var base = localPaths.frontend + moduleName + '/';
	var folder = base + name + '/';
	tools.basic.createFolder(folder, fn_route, folder, name, moduleName);

	// Update App
	tools.updateFileWithTemplate(base + moduleName + 'App.js', base, 'routePart.js', moduleName + 'App.js', {
		route: name
	});

	// Function 1
	function fn_route(folder, name, moduleName) {
		tools.basic.createFile(folder + name + '.css', '');
		tools.basic.createFile(folder + name + '.html', '');
		tools.createFileWithTemplate('controller.js', folder, name + 'Ctrl.js', {
			module: moduleName,
			name: name
		});
	}
}

module.exports.create = createRoute;