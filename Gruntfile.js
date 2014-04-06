'use strict'

module.exports = function(grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      all: {
        options:{
          port: 9000,
          hostname: 'localhost',
          open: true,
          middleware: function(connect) {
            return [
              require('connect-livereload')(),
              connect.static(require('path').resolve('.'))
            ]
          }
        }
      }
    },
    open: {
      all: {
        path: 'http://localhost:<%= connect.all.options.port%>'
      }
    },
    less: {
      all: {
        files: {
          "css/main.css": "less/main.less"
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      html: {
        files: ['**/*.html']
      },
      css: {
        files: ['less/*.less'],
        tasks: ['less']
      },
      js: {
        files: ['js/*.js']
      }
    }
  })

  grunt.registerTask('default', ['less', 'connect', 'watch'])
}
