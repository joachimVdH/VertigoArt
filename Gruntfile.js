module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
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

			livereload: {
				files: ['*.html', 'css/*.css', 'img/*'],
				options: {
					livereload: true
				}
			},
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('default', 'watch');

};  