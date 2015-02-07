module.exports = function (grunt) {

	var pkg = grunt.file.readJSON('package.json');

	grunt.initConfig({

		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: 'scss',
					src: ['*.scss'],
					dest: 'css',
					ext: '.css'
				}]
			}
		},

		cssmin: {
			minify: {
				files: {
					'style.css': ['css/index.css', 'css/single.css', 'css/style.css', 'css/sidebar.css']
				}
			}
		},

		watch: {
			sass: {
				files: 'scss/*.scss',
				tasks: ['sass']
			},
			css: {
				files: ['css/index.css', 'css/single.css', 'css/style.css', 'css/sidebar.css'],
				tasks: ['cssmin']
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	grunt.registerTask('default', ['sass', 'cssmin']);

};