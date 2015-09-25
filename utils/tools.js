var constants = require('./constants')();
var basic = require('./basic');

module.exports = {
	// Dependencies
	constants: constants,
	basic: basic,
	// Function to create a file using a template
	createFileWithTemplate: function (source, dest, file, values, callback) {
		var filePath = basic.path.normalize(__dirname + '/../' + constants.paths.temp + source);
		basic.readFile(filePath, function (data) {
			for (var key in values) {
				if (values.hasOwnProperty(key)) {
					var regex = new RegExp('##' + key, 'g');
					data = data.replace(regex, values[key]);
				}
			}
			basic.createFile(dest + file, data, callback);
		});
	},
	// Function to update file using another template to fill
	updateFileWithTemplate: function (source, dest, templateFile, file, values, callback) {
		basic.readFile(constants.paths.temp + templateFile, function (data) {
			for (var key in values) {
				if (values.hasOwnProperty(key)) {
					var regex = new RegExp('##' + key, 'g');
					data = data.replace(regex, values[key]);
				}
			}
			basic.updateFile(source, dest, file, data, callback);
		});
	}
};