module.exports = function(grunt) {

    // Settings & Libraries
    // -----------------------------------------------
    var result = {
        options: {
            shorthandCompacting: false,
            roundingPrecision: -1
        },
        librariesCss: {
            files: {
                '<%= properties.dest.dist %>/libraries.css': [
                    '<%= properties.dest.dev %>/libraries.css'
                ]
            }
        }
    };

    // Generating dynamically all the settings
    // -----------------------------------------------
    var modules = grunt.config.data.properties.modules;
    var name;

    for (var i = 0; i < modules.length; i++) {
        name = modules[i];
        commonMinify(name);
    }

    commonMinify('base');

    function commonMinify(name) {
        var aux = {};
        aux['<%= properties.dest.dist %>/' + name + '/' + name + '.css'] = [
            '<%= properties.dest.dev %>/' + name + '/' + name + '.css'
        ];

        result[name + 'Css'] = {
            files: aux
        }
    }

    grunt.config('cssmin', result);

    grunt.loadNpmTasks('grunt-contrib-cssmin');

};