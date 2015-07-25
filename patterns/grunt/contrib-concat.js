module.exports = function(grunt) {

    // Libraries & Utils
    // -----------------------------------------------
    var result = {
        librariesJs: {
            options: {
                separator: ';'
            },
            src: [
                '<%= properties.libs.base %>/jquery/dist/jquery.js',
                '<%= properties.libs.base %>/angular/angular.js',
                '<%= properties.libs.base %>/underscore/underscore.js',
                '<%= properties.libs.base %>/angular-ui-router/release/angular-ui-router.js',
                '<%= properties.libs.base %>/bootstrap/dist/js/bootstrap.js',
                '<%= properties.libs.base %>/bootstrapValidator/dist/js/bootstrapValidator.js'
            ],
            dest: '<%= properties.dest.dev %>/libraries.js'
        },
        librariesCss: {
            src: [
                '<%= properties.libs.base %>/bootstrap/dist/css/bootstrap.min.css',
                '<%= properties.libs.base %>/bootstrapValidator/dist/css/bootstrapValidator.min.css'
            ],
            dest: '<%= properties.dest.dev %>/libraries.css'
        },
        utils: {
            options: {
                separator: ';'
            },
            src: [
                '<%= properties.res.base %>/utils/*.js'
            ],
            dest: '<%= properties.dest.dev %>/utils.js'
        }
    };

    // Generating dynamically all the settings
    // -----------------------------------------------
    var modules = grunt.config.data.properties.modules;
    var name;

    for (var i = 0; i < modules.length; i++) {
        name = modules[i];

        result[name + 'App'] = {
            options: {
                separator: ';'
            },
            src: [
                '<%= properties.proj.base %>/' + name + '/' + name + 'App.js',
                '<%= properties.proj.base %>/' + name + '/**/*.js'
            ],
            dest: '<%= properties.dest.dev %>/' + name + '/' + name + '.js'
        };

        makeResource(name);
        
    }

    makeResource('base');

    function makeResource(name) {
        // CSS
        // -----------------------------------------------
        result[name + 'Css'] = {
            src: [
                '<%= properties.proj.base %>/' + name + '/**/*.css',
                '<%= properties.res.base %>/' + name + '/**/*.css'
            ],
            dest: '<%= properties.dest.dev %>/' + name + '/' + name + '.css'
        };
        // STANDALONE
        // -----------------------------------------------
        result[name + 'Controllers'] = {
            options: {
                separator: ';'
            },
            src: [
                '<%= properties.res.base %>/' + name + '/controllers/*.js'
            ],
            dest: '<%= properties.dest.dev %>/' + name + '/controllers.js'
        };
        result[name + 'Directives'] = {
            options: {
                separator: ';'
            },
            src: [
                '<%= properties.res.base %>/' + name + '/directives/*.js',
                '<%= properties.res.base %>/' + name + '/directives/**/*.js'
            ],
            dest: '<%= properties.dest.dev %>/' + name + '/directives.js'
        };
        result[name + 'Services'] = {
            options: {
                separator: ';'
            },
            src: [
                '<%= properties.res.base %>/' + name + '/services/*.js',
                '<%= properties.res.base %>/' + name + '/services/**/*.js'
            ],
            dest: '<%= properties.dest.dev %>/' + name + '/services.js'
        };
    }

    grunt.config('concat', result);

    grunt.loadNpmTasks('grunt-contrib-concat');
    
};