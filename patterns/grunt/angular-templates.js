module.exports = function(grunt) {

    // Initialization
    // -----------------------------------------------
    var result = {};

    // Generating dynamically all the settings
    // -----------------------------------------------
    var modules = grunt.config.data.properties.modules;
    var name;

    for (var i = 0; i < modules.length; i++) {
        name = modules[i];

        result[name + 'Html'] = {
            src: '<%= properties.proj.base %>/' + name + '/**/*.html',
            dest: '<%= properties.dest.dev %>/' + name + '/html.js',
            options: {
                module: name + 'Html',
                standalone: true,
                htmlmin: {
                    collapseWhitespace: true
                },
                url: function(url) {
                    return url.replace(/^.*[\\\/]/, '');
                }
            }
        };
        
        makeTemplates(name);

    }

    makeTemplates('base');

    function makeTemplates(name) {
        result[name + 'Templates'] = {
            src: [
                '<%= properties.res.base %>/' + name + '/templates/**/*.html',
                '<%= properties.res.base %>/' + name + '/directives/**/*.html'
            ],
            dest: '<%= properties.dest.dev %>/' + name + '/templates.js',
            options: {
                module: name + 'Templates',
                standalone: true,
                htmlmin: {
                    collapseWhitespace: true
                },
                url: function(url) {
                    return url.replace(/^.*[\\\/]/, '');
                }
            }
        };
    }

    grunt.config('ngtemplates', result);

    grunt.loadNpmTasks('grunt-angular-templates');

};