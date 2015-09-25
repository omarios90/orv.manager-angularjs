var tools = require('../utils/tools');

function createResource(moduleName, localPaths) {
	var base = localPaths.resources + moduleName + '/';
	var res = [
		{
			name: moduleName + 'Services',
			path: base + 'services/'
		}, {
			name: moduleName + 'Directives',
			path: base + 'directives/'
		}, {
			name: moduleName + 'Controllers',
			path: base + 'controllers/'
		}];

	// Creating folders
	tools.basic.createFolder(base + 'templates/', fn_style, base);
	tools.basic.createFolder(base + 'libraries/', fn_style, base);
	for (var i = 0; i < res.length; i++) {
		tools.basic.createFolder(res[i].path, fn_init, res[i]);
	}

	// Function 1
	function fn_init(resource) {
		tools.createFileWithTemplate('init.js', resource.path, '_init.js', {
			module: resource.name
		});
	}

	// Function 2
	function fn_style(base) {
		tools.basic.createFile(base + 'styles.css', '');
		tools.basic.createFile(base + 'templates/' + moduleName + '-demo.html', '');
	}
}

module.exports.create = createResource;