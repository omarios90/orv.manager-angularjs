var tools = require('../utils/tools');

function createTemplate(name, moduleName, localPaths) {
	var folder = localPaths.resources + moduleName + '/templates/' + name + '/';
	tools.basic.createFolder(folder, fn_template, folder, name);

	// Function 1
	function fn_template(folder, name) {
		tools.basic.createFile(folder + name + '.css', '');
		tools.basic.createFile(folder + name + '.html', '');
	}
}

module.exports.create = createTemplate;