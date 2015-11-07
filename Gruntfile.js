module.exports = function(grunt) {

require('load-grunt-tasks')(grunt); // Load all grunt-* packages from package.json
require('time-grunt')(grunt);       // Display the elapsed execution time of grunt tasks

grunt.initConfig({
  /*less: {
    style: {
      options: {
        compress: false,
        yuicompress: false,
        optimization: 2,
        sourceMap: true,
        sourceMapFilename: "index.css.map",
        sourceMapURL: 'index.css.map',
        sourceMapRootpath: '/'
      },
      files: {
        'index.css': ['less/index.less']
      }
    }
  },*/

  autoprefixer: {
    options: {
      browsers: ['last 2 versions', 'ie 9'],
      map: true
    },
    style: {
      src: 'index.css'
    }
  },

  newer: {
    options: {
      override: function(details, include) {
        if (details.task === 'less') {
          checkForNewerImports(details.path, details.time, include);
        } else {
          include(false);
        }
      }
    }
  },

  watch: {
    style: {
      files: ['*.css', 'less/*.less'],
      tasks: ['style'],
      options: {
        spawn: false,
        livereload: true
      }
    },
    scripts: {
      files: ['js/*.js'],
      options: {
        spawn: false,
        livereload: true
      }
    },
    images: {
      files: ['img/*.{png,jpg,gif,svg}', 'photos/*.{jpg,webp}'],
      options: {
        spawn: false,
        livereload: true
      }
    },
    html: {
      files: ['*.html'],
      options: {
        spawn: false,
        livereload: true
      }
    }
  },


  browserSync: {
    dev: {
      bsFiles: {
        src : [
          '*.css',
          'js/*.js',
          'img/*.{png,jpg,gif,svg}',
          'photos/*.{jpg,webp}',
          '*.html'
        ]
      },
      options: {
        watchTask: true,
        server: {
          baseDir: "./"
        },
        ghostMode: {
          clicks: true,
          forms: true,
          scroll: false
        }
      }
    }
  }
});

/*
var fs = require('fs');
var path = require('path');

function checkForNewerImports(lessFile, mTime, include) {
fs.readFile(lessFile, "utf8", function(err, data) {
  var lessDir = path.dirname(lessFile),
    regex = /@import "(.+?)(\.less)?";/g,
    shouldInclude = false,
    match;

  while ((match = regex.exec(data)) !== null) {
    var importFile = lessDir + '/' + match[1] + '.less';
    if (fs.existsSync(importFile)) {
      var stat = fs.statSync(importFile);
      if (stat.mtime > mTime) {
        shouldInclude = true;
        break;
      }
    }
  }
  include(shouldInclude);
});
}*/


  grunt.registerTask('default', [
    //'newer:less',
    'newer:autoprefixer',
    'browserSync',
    'watch'
  ]);

  grunt.registerTask('style', [
    //'newer:less',
    //'newer:autoprefixer'
  ]);

};
