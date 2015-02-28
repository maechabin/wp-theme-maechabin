module.exports = function (grunt) {

	var pkg = grunt.file.readJSON('package.json');

	grunt.initConfig({

		file: {

			get_name: function (dir) {

				var fs = require("fs");
				var regexp_css = /^style\-[0-9a-z]{32}\.css$/;
				var regexp_js = /^function\.min\-[0-9a-z]{32}\.js$/;
				var list = fs.readdirSync("assets/");
				var regexp = (dir === "css") ? regexp_css : regexp_js;

				for (var i = 0; i < list.length; i++){

					if (list[i].match(regexp)) {
						return list[i].match(regexp).input;
						break;
					}

				}

			}

		},

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
					'js/function.min.js': 'js/function.js'
				}
			}
		},

		clean: {

			css: ['assets/*.css'],

			js: ['assets/*.js']

		},

		md5: {

			css: {
				files: {
					'assets/': 'style.css'
				}
			},

			js: {
				files: {
					'assets/': 'js/function.min.js'
				}
			}

		},

		replace: {

			css: {
				src: ['header.php'],
				overwrite: true,
				replacements: [{
					from: /\/wp-content\/themes\/chabin\/assets\/style\-[0-9a-z]{32}\.css/g,
					to: '/wp-content/themes/chabin/assets/<%= file.get_name("css") %>'
				}]
			},

			js: {
				src: ['footer.php'],
				overwrite: true,
				replacements: [{
					from: /\/wp-content\/themes\/chabin\/assets\/function\.min\-[0-9a-z]{32}\.js/g,
					to: '/wp-content/themes/chabin/assets/<%= file.get_name("js") %>'
				}]
			}

		},

		typescript: {

			ts: {
				files: {
					'ts/function.js': 'ts/function.ts'
				},
				options: {
					module: 'amd', //or commonjs 
					target: 'es5' //or es3 
				}
			}

		},

		watch: {

			sass: {
				files: ['scss/*.scss'],
				tasks: ['sass']
			},

			css: {
				files: ['css/index.css', 'css/single.css', 'css/style.css', 'css/sidebar.css'],
				tasks: ['cssmin', 'clean:css', 'md5:css', 'replace:css']
			},

			js: {
				files: ['js/function.js'],
				tasks: ['uglify', 'clean:js', 'md5:js', 'replace:js']
			},

			ts: {
				files: ['ts/*.ts'],
				tasks: ['typescript']
			}

		}

	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-md5');
	grunt.loadNpmTasks('grunt-typescript');

	grunt.registerTask('default', ['sass', 'cssmin']);

};