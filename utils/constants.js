module.exports = function () {
	var temp = 'patterns/';
	var utils = temp + 'utils/';
	var grunt = temp + 'grunt/';
	var updatePhrase = '/*DONT_ERASE*/'

	return {
		paths: {
			temp: temp,
			utils: utils,
			grunt: grunt
		},
		vars: {
			updatePhrase: updatePhrase
		}
	};
};