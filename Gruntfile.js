module.exports = (grunt) => {
  const pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    file: {
      get_name(dir) {
        const fs = require('fs');
        const regexpCss = /^style-[0-9a-z]{32}\.css$/;
        const regexpJs = /^function\.min-[0-9a-z]{32}\.js$/;
        const list = fs.readdirSync('src/app/assets/');
        const regexp = dir === 'src/css' ? regexpCss : regexpJs;

        for (let i = 0; i < list.length; i++) {
          if (list[i].match(regexp)) {
            return list[i].match(regexp).input;
          }
        }
        return null;
      },
    },

    sass: {
      dist: {
        options: {
          style: 'expanded',
        },
        files: [
          {
            expand: true,
            cwd: 'src/scss',
            src: ['*.scss', '*.sass'],
            dest: 'src/css',
            ext: '.css',
          },
        ],
      },
    },

    cssmin: {
      minify: {
        files: {
          'src/style.css': [
            'src/css/style.css',
            'src/css/prettify.min.css',
            'src/css/font-awesome.min.css',
          ],
        },
      },
    },

    uglify: {
      dist: {
        files: {
          'src/js/function.min.js': 'src/js/function.js',
        },
      },
    },

    clean: {
      css: ['src/app/assets/*.css'],
      js: ['src/app/assets/*.js'],
    },

    md5: {
      css: {
        files: {
          'src/app/assets/': 'src/style.css',
        },
      },
      js: {
        files: {
          'src/app/assets/': 'src/js/function.min.js',
        },
      },
    },

    replace: {
      css: {
        src: ['src/header.php'],
        overwrite: true,
        replacements: [
          {
            from: /\/wp-content\/themes\/chabin\/assets\/style-[0-9a-z]{32}\.css/g,
            to: '/wp-content/themes/chabin/assets/<%= file.get_name("css") %>',
          },
        ],
      },
      js: {
        src: ['src/header.php'],
        overwrite: true,
        replacements: [
          {
            from: /\/wp-content\/themes\/chabin\/assets\/function\.min-[0-9a-z]{32}\.js/g,
            to: '/wp-content/themes/chabin/assets/<%= file.get_name("js") %>',
          },
        ],
      },
    },

    browserify: {
      dist: {
        options: {
          transform: [['babelify']],
        },
        files: {
          'src/js/function.js': ['src/js/app.js', 'src/js/prettify.js'],
        },
      },
    },

    watch: {
      sass: {
        files: ['src/scss/*.scss', 'src/scss/*.sass'],
        tasks: ['sass'],
      },
      css: {
        files: ['src/css/index.css', 'src/css/single.css', 'src/css/style.css', 'css/sidebar.css'],
        tasks: ['cssmin', 'clean:css', 'md5:css', 'replace:css'],
      },
      js: {
        files: ['src/js/*.js'],
        tasks: ['browserify', 'uglify', 'clean:js', 'md5:js', 'replace:js'],
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-md5');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['sass', 'cssmin']);
};
