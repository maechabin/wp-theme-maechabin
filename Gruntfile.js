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
					'style.css': ['css/index.css', 'css/single.css', 'css/sidebar.css', 'css/style.css', 'css/prettify.min.css', 'css/font-awesome.min.css']
				}
			}
		},

		uglify: {
			dist: {
				files: {
					// 出力ファイル: 元ファイル
					'js/function.min.js': 'js/function.js'
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
			},

			js: {
				// 監視したいファイル
				files: 'js/*.js',
				// 変更を感知した時に実行するタスク
				tasks: ['uglify']
			}

		}

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['sass', 'cssmin']);

};