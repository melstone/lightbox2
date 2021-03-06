module.exports = function(grunt) {

  grunt.initConfig({
    host_config: grunt.file.readJSON('.host_config'),
    compass: {
      dist: {
        options: {
          sassDir: 'sass',
          cssDir: 'css',
          environment: 'production'
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 8000
        }
      }
    },
    exec: {
      list: {
        cmd: ['ls', 'ls -l'].join('&&')
      },
    },
    'ftp-deploy': {
      build: {
        auth: {
          host: '<%- host_config.host %>',
          port: '<%- host_config.port %>'
        },
        src: '.',
        dest: '<%- host_config.directory %>',
        exclusions: [
          '.DS_Store',
          '.sass-cache',
          '.git*',
          '.host_config',
          '.ftppass',
          'node_modules',
          'sass',
          'Gruntfile.js',
          'package.json'
        ]
      }
    },
    jshint: {
      files: ['js/lightbox.js']
    },
    uglify: {
      options: {
        preserveComments: 'some',
        sourceMap: true
      },
      dist: {
        files: {
          'js/lightbox.min.js': ['js/lightbox.js']
        }
      }
    },   
    watch: {
      sass: {
        files: ['sass/*.sass'],
        tasks: ['compass'],
        options: {
          livereload: true,
          spawn: false
        },
      },
      test: {
        files: ['js/lightbox.js'],
        tasks: ['jshint']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-ftp-deploy');


  grunt.registerTask('default', ['compass', 'connect', 'watch']);
  grunt.registerTask('test',  ['compass', 'jshint']);
  grunt.registerTask('zip',  ['uglify','exec:list']);
  // grunt.registerTask('deploy',  ['compass', 'jshint', 'ftp-deploy']);
};