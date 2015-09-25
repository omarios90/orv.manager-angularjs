var tools = require('../utils/tools');

function createDirective(name, moduleName, localPaths) {
	var folder = localPaths.resources + moduleName + '/directives/' + name + '/';
	tools.basic.createFolder(folder, fn_directive, folder, name);

	// Function 1
	function fn_directive(folder, name) {
		tools.createFileWithTemplate('directive.js', folder, name + '.js', {
			module: moduleName,
			name: name
		});
		tools.basic.createFile(folder + name + '.html', '');
		tools.basic.createFile(folder + name + '.css', '');
	}
}

module.exports.create = createDirective;