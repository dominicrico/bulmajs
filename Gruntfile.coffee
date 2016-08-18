module.exports = (grunt) ->

  # Constants
  BUILD_PATH = 'build'

  # Project configuration
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    clean:
      build: [BUILD_PATH]

    coffee:
      build:
        options:
          bare: true
        files: [
          expand: true
          cwd: 'src'
          src: ['**/*.coffee']
          dest: 'build/components'
          ext: '.js'
        ]

    concat:
      options:
        separator: ';'
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */',
      build:
        src: ['build/components/**/*.js']
        dest: 'build/bulma.js'

    uglify:
      build:
        files:
          'build/min/bulma.min.js': ['build/bulma.js']


  # Dependencies
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-uglify'

  # Aliases
  grunt.registerTask 'build', [
    'clean:build'
    'coffe:build'
    'concat:build'
    'uglify:build'
  ]

  grunt.registerTask 'default', [
    'clean:build'
    'coffe:build'
    'concat:build'
  ]
