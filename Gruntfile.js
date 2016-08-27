module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/js/<%= pkg.name %>.js',
        dest: 'dist/js/<%= pkg.name %>.min.js'
      }
    },
    less: {
      dev: {
        files: {
          "dist/css/<%= pkg.name %>.css": "src/less/socialist.less"
        }
      },
      dist: {
        files: {
          "dist/css/<%= pkg.name %>.min.css": "src/less/socialist.less"
        }
      }
    },
    typescript: {
      base: {
        src: ['src/ts/**/*.ts'],
        dest: 'dist/js/',
        options: {
          module: 'amd', //or commonjs 
          target: 'es5', //or es3 
          sourceMap: true,
          declaration: true
        }
      }
    },
    watch: {
      less: {
        files: "src/less/**/*.less",
        tasks: ["less"],
      },
      typescript:{
        files: "src/ts/**/*.ts",
        tasks: ["typescript"],
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-typescript');

  // Default task(s).
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('stylesheets', ['less','watch:less']);
  grunt.registerTask('scripts', ['typescript','watch:typescript']);
};