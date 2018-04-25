const webpackConfig = require('./webpack.config.js');
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = require('./aws_config.js');

module.exports = function(grunt) {
  grunt.initConfig({
    webpack: {
      options: {
        stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
      },
      prod: webpackConfig,
      dev: Object.assign({ watch: false }, webpackConfig)
    },
    s3: {
      options: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        bucket: 'fantasybnb-imageservice-assets',
      },
      build: {
        cwd: 'public',
        src: '**'
      }
    }
    // aws_s3: {
    //   options: {
    //     bucket: 'fantasybnb-imageservice-assets',
    //     region: 'us-east-1',
    //   },
    //   push: {
    //     options: {
    //       accessKeyId: AWS_ACCESS_KEY_ID,
    //       secretAccessKey: AWS_SECRET_ACCESS_KEY,
    //       progress: 'progressBar'
    //     },
    //     files: [
    //       {expand: true, cwd: 'build', src: ['build/bundle.min.js'], dest: 'app/', action: 'upload'},
    //     ]
    //   }
    // }
  });

  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-aws');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['webpack', 's3']);
};