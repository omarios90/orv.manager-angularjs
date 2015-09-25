module.exports = function(grunt) {

    // Utils
    // -----------------------------------------------
    var result = {
        utils: {
            files: [
                '<%= properties.res.base %>/utils/*.js'
            ],
            tasks: ['concat:utils']
        }
    };

    // Generating dynamically all the settings
    // -----------------------------------------------
    var modules = grunt.config.data.properties.modules;
    var name;

    for (var i = 0; i < modules.length; i++) {
        name = modules[i];

        result[name + 'App'] = {
            files: [
                '<%= properties.proj.base %>/' + name + '/' + name + 'App.js',
                '<%= properties.proj.base %>/' + name + '/**/*.js'
            ],
            tasks: ['concat:' + name + 'App']
        };
        result[name + 'Html'] = {
            files: [
                '<%= properties.proj.base %>/' + name + '/**/*.html'
            ],
            tasks: ['ngtemplates:' + name + 'Html']
        };

        commonWatch(name);

    };

    commonWatch('base');

    function commonWatch(name) {
        result[name + 'Css'] = {
            files: [
                '<%= properties.proj.base %>/' + name + '/**/*.css',
                '<%= properties.res.base %>/' + name + '/*.css',
                '<%= properties.res.base %>/' + name + '/**/*.css'
            ],
            tasks: ['concat:' + name + 'Css']
        };
        result[name + 'Controllers'] = {
            files: [
                '<%= properties.res.base %>/' + name + '/controllers/*.js'
            ],
            tasks: ['concat:' + name + 'Controllers']
        };
        result[name + 'Directives'] = {
            files: [
                '<%= properties.res.base %>/' + name + '/directives/*.js',
                '<%= properties.res.base %>/' + name + '/directives/**/*.js'
            ],
            tasks: ['concat:' + name + 'Directives']
        };
        result[name + 'Services'] = {
            files: [
                '<%= properties.res.base %>/' + name + '/services/*.js',
                '<%= properties.res.base %>/' + name + '/services/**/*.js'
            ],
            tasks: ['concat:' + name + 'Services']
        };
        result[name + 'Templates'] = {
            files: [
                '<%= properties.res.base %>/' + name + '/templates/**/*.html',
                '<%= properties.res.base %>/' + name + '/directives/**/*.html'
            ],
            tasks: ['ngtemplates:' + name + 'Templates']
        }
    }

    grunt.config('watch', result);

    grunt.loadNpmTasks('grunt-contrib-watch');

};