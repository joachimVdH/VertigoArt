module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
        concat: {
                options: {
                        separator: '\r\n'
                },
                dist: {
                        src: ['js_src/jquery-2.1.1.min.js','js_src/smoothScroll.js','js_src/jquery.flickr.js','js_src/slick.min.js','js_src/picturefill.min.js','js_src/vertigoArtStart.js'],
                        dest: 'js/va.js'
                }
        },

        uglify: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd HH:nn") %> */\n'
                },
                build: {
                    src: 'js/va.js',
                    dest: 'js/va.min.js'
                }
        },

		compass: {
			dist:{
				options: {
					outputStyle: 'compressed',
					sassDir: 'sass',
					cssDir: 'css'
				}
			}
		},

        autoprefixer: {
          options: {
              // Task-specific options go here.
              browsers: ['last 2 version', 'ie 8', 'ie 9', 'Opera 12.1']
          },
          dist: {
              // Target-specific file lists and/or options go here.
              src:'css/va.css',
              dest:'css/va-p.css'
          }
        },

		watch: {
			sass: {
				files: ['**/*.scss'],
				tasks: ['compass','autoprefixer']
			},

			js: {
				files: ['js_src/*.js'],
				tasks: ['concat', 'uglify']
			},

			livereload: {
				files: ['*.html', 'css/*.css', 'js_src/*.js', 'img/*'],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-autoprefixer');

	grunt.registerTask('default', 'watch');

};  