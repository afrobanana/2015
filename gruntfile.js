module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    /**
     *  prepares usemin references in the referenced files ready for concat,
     *  uglify and cssmin
     */
    useminPrepare: {
      options: {
        dest: '<%= pkg.build_dir %>',
        root: '<%= pkg.build_dir %>',
        assetsDirs: '<%= pkg.assets_dir %>',
      },
      html: '<%= pkg.build_dir %>/**/*.html'
    },
    /**
     *  runs concat, uglify and cssmin on resources in referenced files
     */
    usemin: {
      options: {
        dest: '<%= pkg.build_dir %>',
        assetsDirs: [
          '<%= pkg.build_dir %>',
          '<%= pkg.build_dir %>/<%= pkg.assets_dir %>/**/*'
        ],
        prefix: '<%= pkg.baseurl %>',
      },
      html: '<%= pkg.build_dir %>/**/*.html',
      css: '<%= pkg.build_dir %><%= pkg.assets.css %>**.min.css'
    },
    imagemin: {
      options: {cache: true},
      dynamic: {
        files: [{
            expand: true,
            cwd: '<%= pkg.build_dir %><%=  pkg.assets.images %>',
            src: ['**/*.{jpg,png,gif}'],
            dest: '<%= pkg.build_dir %><%=  pkg.assets.images %>'
        }]
      }
    },
    shell: {
        jekyllServe: {
            command: "jekyll serve --baseurl ''"
        },
        jekyllBuild: {
            command: "jekyll build"
        },
        jekyllWatch: {
            command: "jekyll build -w"
        }
    },
    convert: {
        config: {
            files: [{
                src: ['package.json'],
                dest: '_config.yml'
            }]
        }
    },
    watch: {
      config: {
        files: [ 'package.json' ],
        tasks: [
          'convert:config',
          'shell:jekyllServe',
        ],
        options: {
            interrupt: true,
        }
      },
      css: {
        files: [
            '.<%=  pkg.assets.css %>**/**/*.css',
        ],
        tasks: [ 'shell:jekyllServe'],
        options: {
          interrupt: true,
        }
      },
      js: {
        files: [
            'gruntfile.js',
            '.<%= pkg.assets.js %>**/**/*.js',
        ],
        tasks: [
          // 'jshint',
          'shell:jekyllServe',
        ],
        options: {
          interrupt: true,
        }
      },
      images: {
        files: [
            '.<%=  pkg.assets.images %>_src/**/*.{png,jpg,gif,jpeg}',
        ],
        tasks: ['newer:imagemin', 'shell:jekyllServe'],
        options: {
          interrupt: true,
        }
      },
      jekyll: {
        files: [
            '**/*.markdown',
            '**/*.yaml',
            '**/*.md',
            '**/*.html',
            '!<%= pkg.build_dir %>/**/*.html',
            '!<%= pkg.build_dir %>/**/*.markdown',
            '!<%= pkg.build_dir %>/**/*.yaml',
            '!<%= pkg.build_dir %>/**/*.md',
        ],
        tasks: ['shell:jekyllServe',],
        options: {
            interrupt: true,
            atBegin: true,
        }
      }
    },
    connect: {
      serve: {
        options: {
          appName: '<%= pkg.name %>',
          port: 9001,
          base: '<%= pkg.serve_dir %>',
          keepalive: true
        }
      }
    },
    'gh-pages': {
      options: {
        base: '<%= pkg.build_dir %>',
        tag: '<%= pkg.version %>'
      },
      src: ['**']
    },
    rev: {
      options: {
        algorithm: 'md5',
        length: 8
      },
      // images: {
      //   src: [
      //     '<%= pkg.build_dir %><%= pkg.assets.images %>**/*.{jpg,png,gif,jpeg}'
      //   ]
      // },
      css: {
        src: [
          '<%= pkg.build_dir %><%= pkg.assets.css %><%= pkg.name %>.min.css',
        ],
      },
      js: {
        src: [
          '<%= pkg.build_dir %><%= pkg.assets.js %><%= pkg.name %>.min.js',
        ]
      }
    },
    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true,
        removeEmptyAttributes: true,
        caseSensitive: true
      },
      files: {
        expand: true,
        cwd: '<%= pkg.build_dir %>',
        src: ['**/*.html'],
        dest: '<%= pkg.build_dir %>'
      }
    },
    jshint: {
      all: [
        'gruntfile.js',
        'package.json',
        '.<%=  pkg.assets.js %>**/*.js',
      ]
    },
    csslint: {
      all: [
        '.<%=  pkg.assets.css %>**/*.css',
      ]
    },
    copy: {
      serve: {
        src: '<%= pkg.build_dir %>/**',
        dest: '.tmp/',
      },
    },
    rename: {
      serve: {
        src: '.tmp/<%= pkg.build_dir %>',
        dest: '<%= pkg.serve_dir %><%= pkg.baseurl %>'
      },
    },
    clean: {
      serve: '<%= pkg.serve_dir %>',
      build: '<%= pkg.build_dir %>',
      grunt: '.grunt',
      tmp: '.tmp',
      sass: '.sass-cache',
    },
    manifest: {
      generate: {
        options: {
          basePath: '<%= pkg.build_dir %>',
          network: [
            '*'
          ],
          cache: [],
          verbose: false,
          timestamp: true,
          hash: true,
        },
        src: [
          // pages
          '**/*.html',

          // files
          '**/js/*.min.js',
          '**/css/*.min.css',
          '**/*.jpg',
          '**/*.png',
          '**/*.gif',

          // fonts
          '**/*.eot',
          '**/*.svg',
          '**/*.ttf',
          '**/*.woff',
          '**/*.woff2',
        ],
        dest: '<%= pkg.build_dir %>/manifest.appcache'
      }
    }
  });

  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-manifest');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-rename');
  grunt.loadNpmTasks('grunt-convert');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('dev', [
                     'build',
                     'watch',
  ]);
  grunt.registerTask('srv', [
                     'build',
                     'minify',
  ]);
  grunt.registerTask('deploy', [
                     'build',
                     'minify',
                     'manifest',
                     'push',
                     'clean:grunt',
                     'clean:tmp',
  ]);
  grunt.registerTask('push', [
                     'gh-pages',
  ]);
  grunt.registerTask('serve', [
                     'config',
                     'newer:imagemin',
                     'shell:jekyllBuild',
                     'clean:serve',
                     'minify',
                     'copy:serve',
                     'rename:serve',
                     'clean:grunt',
                     'clean:tmp',
                     'connect:serve',
  ]);
  grunt.registerTask('build', [
                     'config',
                     'shell:jekyllBuild',
  ]);
  grunt.registerTask('config', [
                     'convert:config',
  ]);
  grunt.registerTask('lint', [
                     'jshint',
                     'csslint',
  ]);
  grunt.registerTask('minify', [
                     'imagemin',
                     'useminPrepare',
                     'concat',
                     'uglify',
                     'cssmin',
                     'usemin',
                     'htmlmin',
  ]);
};
