module.exports = function(grunt) {

    // Libraries & Utilities
    // -----------------------------------------------
    var result = {
        librariesJs: {
            src: '<%= properties.dest.dev %>/libraries.js',
            dest: '<%= properties.dest.dist %>/libraries.js'
        },
        utils: {
            src: '<%= properties.dest.dev %>/utils.js',
            dest: '<%= properties.dest.dist %>/utils.js'
        }
    };

    // Generating dynamically all the settings
    // -----------------------------------------------
    var modules = grunt.config.data.properties.modules;
    var name;

    for (var i = 0; i < modules.length; i++) {
        name = modules[i];
        
        result[name + 'App'] = {
            src: '<%= properties.proj.base %>/' + name + '/' + name + 'App.js',
            dest: '<%= properties.dest.dist %>/' + name + '/' + name + '.js'
        };
        result[name + 'Html'] = {
            src: '<%= properties.dest.dev %>/' + name + '/html.js',
            dest: '<%= properties.dest.dist %>/' + name + '/html.js'
        };

        makeResource(name);

    }

    makeResource('base');

    function makeResource(name) {
        result[name + 'Templates'] = {
            src: '<%= properties.dest.dev %>/' + name + '/templates.js',
            dest: '<%= properties.dest.dist %>/' + name + '/templates.js'
        };
        result[name + 'Controllers'] = {
            src: '<%= properties.dest.dev %>/' + name + '/controllers.js',
            dest: '<%= properties.dest.dist %>/' + name + '/controllers.js'
        };
        result[name + 'Directives'] = {
            src: '<%= properties.dest.dev %>/' + name + '/directives.js',
            dest: '<%= properties.dest.dist %>/' + name + '/directives.js'
        };
        result[name + 'Services'] = {
            src: '<%= properties.dest.dev %>/' + name + '/services.js',
            dest: '<%= properties.dest.dist %>/' + name + '/services.js'
        };
    }

    grunt.config('uglify', result);

    grunt.loadNpmTasks('grunt-contrib-uglify');

};