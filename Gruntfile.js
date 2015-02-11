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

		replace: {

			css: {
				src: ['header.php'],
				overwrite: true,
				replacements: [{
					from: /\<\?php\sbloginfo\(\'stylesheet_url\'\)\;\s\?\>\?ver\=[0-9]{14}/g,
					to: "<?php bloginfo('stylesheet_url'); ?>?ver=<%= grunt.template.today('yyyymmddhhmmss') %>"
				}]
			},

			js: {
				src: ['footer.php'],
				overwrite: true,
				replacements: [{
					from: /\/wp-content\/themes\/chabin\/js\/function.min\.js\?ver\=[0-9]{14}/g,
					to: '/wp-content/themes/chabin/js/function.min.js?ver=<%= grunt.template.today("yyyymmddhhmmss") %>'
				}]
			}

		},

		watch: {

			sass: {
				files: 'scss/*.scss',
				tasks: ['sass']
			},

			css: {
				files: ['css/index.css', 'css/single.css', 'css/style.css', 'css/sidebar.css'],
				tasks: ['cssmin', 'replace:css']
			},

			js: {
				// 監視したいファイル
				files: 'js/function.js',
				// 変更を感知した時に実行するタスク
				tasks: ['uglify', 'replace:js']
			}

		}

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-text-replace');

	grunt.registerTask('default', ['sass', 'cssmin']);

};