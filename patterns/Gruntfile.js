module.exports = function(grunt) {

    // ------------------------------------------------------------------------------

    grunt.file.defaultEncoding = 'utf8';

    // Configuration
    grunt.initConfig({
        pkg: require('./package.json'),
        // Properties
        properties: {
            // Libraries
            libs: {
                base: 'bower_components'
            },
            modules: [ /*DONT_ERASE*/ ],
            // Project
            proj: {
                name: '##project',
                base: '<%= properties.proj.name %>/frontend'
            },
            // Resources
            res: {
                base: '<%= properties.proj.name %>/resources'
            },
            // Destination
            dest: {
                base: './##destination',
                dev: '<%= properties.dest.base %>/dev',
                dist: '<%= properties.dest.base %>/dist'
            }
        }
    });

    // ------------------------------------------------------------------------------

    // Load all npm grunt tasks
    grunt.loadTasks('grunt');

    // ------------------------------------------------------------------------------

    // Default
    grunt.registerTask('default', [
        'dev-libraries',
        'dist-libraries',
        'bootstrap-fonts'
    ]);

    // ------------------------------------------------------------------------------

    // Libraries
    grunt.registerTask('dev-libraries', [
        'concat:librariesJs',
        'concat:librariesCss'
    ]);
    grunt.registerTask('dist-libraries', [
        'uglify:librariesJs',
        'cssmin:librariesCss'
    ]);
    grunt.registerTask('bootstrap-fonts', [
        'copy:bootstrapFonts'
    ]);

    // ------------------------------------------------------------------------------
    // Base
    grunt.registerTask('dev-base', [
        'concat:baseCss',
        'concat:baseControllers',
        'concat:baseDirectives',
        'concat:baseServices',
        'ngtemplates:baseTemplates'
    ]);
    grunt.registerTask('dist-base', [
        'cssmin:baseCss',
        'uglify:baseControllers',
        'uglify:baseDirectives',
        'uglify:baseServices',
        'uglify:baseTemplates',
    ]);

    // ------------------------------------------------------------------------------

    // Modules
    var modules = grunt.config.data.properties.modules;
    var name;

    for (var i = 0; i < modules.length; i++) {
        name = modules[i];
        grunt.registerTask('dev-' + name, [
            'dev-base',
            'concat:utils',
            'concat:' + name + 'App',
            'concat:' + name + 'Controllers',
            'concat:' + name + 'Directives',
            'concat:' + name + 'Services',
            'concat:' + name + 'Css',
            'ngtemplates:' + name + 'Html',
            'ngtemplates:' + name + 'Templates'
        ]);

        grunt.registerTask('dist-' + name, [
            'dist-base',
            'uglify:utils',
            'uglify:' + name + 'App',
            'uglify:' + name + 'Controllers',
            'uglify:' + name + 'Directives',
            'uglify:' + name + 'Services',
            'cssmin:' + name + 'Css',
            'uglify:' + name + 'Html',
            'uglify:' + name + 'Templates'
        ]);
    }

};