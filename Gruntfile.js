module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    		concat: {
    				options: {
    						separator: '\r\n'
    				},
    				dist: {
    						src: ['js_src/jquery-2.1.1.min.js','js_src/smoothScroll.js'],
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
					cssDir: 'css',
				}
			}
		},

		watch: {
			sass: {
				files: ['**/*.scss'],
				tasks: ['compass']
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
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', 'watch');

};  