/* eslint-disable */
const glob = require('glob');
const rimraf = require('rimraf');

const targetDir = ['./controller/**/*.ts', './service/**/*.ts', './common/*.ts', './confog/*.ts'];

targetDir.forEach(dir => {
  glob(dir, function (err, files) {
    if (!err) {
      files.forEach(file => {
        const compiledFile = file.replace(/.ts$/, '.js*');
        rimraf(compiledFile, () => {
          console.log('clean:', compiledFile);
        });
      });
    }
  });
});

glob('./test/**/*.js', function (err, files) {
  files.forEach(file => {
    rimraf(file, () => {
      console.log('clean: ', file);
    });
  });
});
