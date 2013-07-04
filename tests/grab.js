/*jshint node:true, laxcomma:true, indent:2, white:true, curly:true, undef:true, strict:true, trailing:true, eqnull:true */

'use strict';

var grabber = require('../index')
  , fs = require('fs');
  

if (!fs.existsSync('out')) {
  fs.mkdirSync('out');
}

var imageFormat = 'jpeg'
  , options = {
      url: 'http://www.arstechnica.com/',
      createSnapshot: false,
      createHTML: false,
      imageFormat: imageFormat,
      createZip : true
    };

grabber.grab(options, function (err, page) {
  if (err) {
    throw err;
  }
  
  if (page.zip != null) {
    fs.writeFile('out/result.zip', page.zip, 'binary', function (err) {
      if (err) {
        throw err;
      }
      console.log('Archive saved');
    });
  }

  if (page.html != null) {
    fs.writeFile('out/page.html', page.html, 'binary', function (err) {
      if (err) {
        throw err;
      }
      console.log('Html saved');
    });
  }

  if (page.image != null) {
    fs.writeFile('out/snap.' + imageFormat, new Buffer(page.image, 'base64'), 'binary', function (err) {
      if (err) {
        throw err;
      }
      
      console.log('Image saved');
    });
  }
});