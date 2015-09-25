var tools = require('../utils/tools');

function createController(name, moduleName, localPaths) {
	var folder = localPaths.resources + moduleName + '/controllers/';

	tools.createFileWithTemplate('individualController.js', folder, name + '.js', {
		module: moduleName,
		name: name
	});
}

module.exports.create = createController;