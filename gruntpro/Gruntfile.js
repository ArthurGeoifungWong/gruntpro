module.exports = function(grunt){
  // // LiveReload的默认端口号，你也可以改成你想要的端口号
  // var lrPort = 35729;
  // // 使用connect-livereload模块，生成一个与LiveReload脚本
  // // <script src="http://127.0.0.1:35729/livereload.js?snipver=1" type="text/javascript"></script>
  // var lrSnippet = require('connect-livereload')({ port: lrPort });
  // // 使用 middleware(中间件)，就必须关闭 LiveReload 的浏览器插件
  // var lrMiddleware = function(connect, options) {
  //   return [
  //   // 把脚本，注入到静态文件中
  //   lrSnippet,
  //   // 静态文件服务器的路径
  //   connect.static(options.base[0]),
  //   // 启用目录浏览(相当于IIS中的目录浏览)
  //   connect.directory(options.base[0])
  //   ];
  // };
  grunt.initConfig({
    pkg:grunt.file.readJSON('package.json'),
    htmlmin: {
      build: {
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'build/index.html': 'src/html/index.html'     // 'destination': 'source'
        }
      } 
    },
    less: {
      build: {
        options: {                                 
          style: 'expanded'
        },
        files: {                                   // Dictionary of files
          'src/css/index.css': 'src/less/*.less'     // 'destination': 'source'
        }
      }
    },
    cssmin: {
      build: {
        src: 'src/css/*.css',
        dest: 'build/css/index.min.css'
      }
    },
    uglify: {
      build: {
        src: ['src/js/*.js'],
        dest: 'build/js/index.min.js'
      }
    },
    connect: {
    //   target: 'http://localhost:8090', // target url to open
    //   appName: 'open', // name of the app that opens, ie: open, start, xdg-open
    //   callback: function() {} // called when the app has opened
      server: {
        options: {
          open: true,
          port: 8090,
          hostname: 'localhost',
          // keepalive: true,
          base: ['build/'],
          livereload: true
        }
        // 设置了中间件时使用，不用再手动引用livereload.js文件
      //   livereload: {
      //     options: {
      //       // 通过LiveReload脚本，让页面重新加载。
      //       middleware: lrMiddleware
      //     }
      //   }
      }
    },
    watch: {
      buildhtml: {
        files: ['src/html/*.html'],
        tasks: ['htmlmin'],
        options: {
          livereload: true
        }
      },
      buildjs: {
        files: ['src/js/*.js'],
        tasks: ['uglify'],
        options: {
          livereload: true
        }
      },
      buildless: {
        files: ['src/less/*.less'],
        tasks: ['less']
      },
      buildcss: {
        files: ['src/css/*.css'],
        tasks: ['cssmin'],
        options: {
          livereload: true
        }       
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['htmlmin', 'less', 'cssmin', 'uglify', 'connect', 'watch']);
  // grunt.registerTask('live', ['connect', 'watch']);
}
