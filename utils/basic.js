var constants = require('./constants')();

module.exports = {
	// Dependencies
	fs: require('fs'),
	mkdirp: require('mkdirp'),
	shell: require('shelljs'),
	ncp: require('ncp').ncp,
	path: require('path'),
	// Function to create a new file
	createFile: function (path, content, callback) {
		this.fs.writeFile(path, content, 'utf8', function (err) {
			if (err) return console.log(err);
			if (callback) callback();
		});
	},
	// Function to read file
	readFile: function (path, callback) {
		this.fs.readFile(path, 'utf8', function (err, data) {
			if (err) return console.log(err);
			if (callback) callback(data);
		});
	},
	// Function to update files
	updateFile: function (source, dest, file, value) {
		var that = this;
		this.readFile(source, function (data) {
			if (data.indexOf(constants.vars.updatePhrase) > 0) {
				data = data.replace(constants.vars.updatePhrase, value + constants.vars.updatePhrase);
				that.createFile(dest + file, data);
			}
		});
	},
	// Function to create a new folder
	createFolder: function (path, callback, val1, val2, val3) {
		this.mkdirp(path, function (err) {
			if (err) return console.log(err);
			if (callback) callback(val1, val2, val3);
		});
	},
	// Function to copy folder
	copyFolder: function (source, destination) {
		var filePath = this.path.normalize(__dirname + '/../' + source);
		this.ncp.limit = 16;
		this.ncp(filePath, destination, function (err) {
			if (err) return console.log(err);
		});
	}
};