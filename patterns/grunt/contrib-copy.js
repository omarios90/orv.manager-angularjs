module.exports = function (grunt) {

    grunt.config('copy', {
        bootstrapFonts: {
            files: [{
                expand: true,
                cwd: '<%= properties.libs.base %>/bootstrap/fonts/',
                src: ['*'],
                dest: '<%= properties.dest.base %>/fonts/',
                filter: 'isFile'
            }]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');

};