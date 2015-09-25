module.exports = function (grunt) {

	var indexPath = grunt.file.readJSON('./orv.json').angularjs.paths.index;
	var result = {};

	// Generating dynamically all the settings
    // -----------------------------------------------
    var modules = grunt.config.data.properties.modules;
    var name, srcPath;

	for (var i = 0; i < modules.length; i++) {
		name = modules[i];
		srcPath = './' + indexPath + '/' + name + '/';
		result[name + 'VersionPatch'] = {
			src: srcPath + '*.html',
			overwrite: true, 
			replacements: [{
				from: /\?v=([0-9]*)/g,
				to: function (matchedWord, index, fullText, regexMatches) {
					return matchedWord.replace(regexMatches[0], parseInt(regexMatches[0]) + 1)
				}
			}]
		};
	}

	grunt.config('replace', result)

    grunt.loadNpmTasks('grunt-text-replace');

};