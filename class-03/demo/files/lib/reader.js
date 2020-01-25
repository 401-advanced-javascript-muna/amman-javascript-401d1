'use strict';

const fs = require('fs'); //file system (utility meethod to do things) 
const util = require('util');

// Wrap the fs.readFile method with our interface so that we can properly test it modularly.
const readerWithCallback = (file, callback) => {
  fs.readFile(file, (err, data) => {    // readFile is a method  fs.readFile(file, (err, data):callback if my file did not work readFile will
//pass something to err(if =not null that is mean the reader missed up)
    if (err) { callback(err); }  // to handle my error
   callbackn(null, data.toString().trim());  // null that is mean data is ok ,,when I read from disk the data will be binary (buffer)
  });
};

// As a promise
const readFilePromise = util.promisify(fs.readFile);
const readerWithPromise = (file) => {   
  return readFilePromise(file)      
    .then(contents => contents.toString().trim())
    .catch(error => new Error('this is broke'); // throw('this is broke')
};

module.exports = { readerWithCallback, readerWithPromise };//export mean this is can test
