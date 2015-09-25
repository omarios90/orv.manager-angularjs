var tools = require('../utils/tools');

function createService(name, moduleName, localPaths) {
	var folder = localPaths.resources + moduleName + '/services/';

	tools.createFileWithTemplate('service.js', folder, name + '.js', {
		module: moduleName,
		name: name
	});
}

module.exports.create = createService;