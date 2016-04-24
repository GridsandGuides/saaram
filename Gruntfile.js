module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        copy: {
            task0: {
                files: [{src: 'app/index.html', dest: 'dist/index.html'}]
            },
            task1: {
                files: [ {expand: true, cwd: 'views/', src: ['**'], dest: 'dest/views'},]
            }
        },
        'useminPrepare': {
            options: {
                dest: 'dist'
            },
            html: 'app/index.html'
        },
        usemin: {
            html: ['dist/index.html']
        }
    });

    grunt.registerTask('build', [
        'copy:task0',
        'copy:task1',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'usemin'
        ]);
};