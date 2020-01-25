'use strict';

const fs = require('fs');
const util = require('util')  

const reader = require('./lib/reader.js');   // acsess to reader.js

let file = `${__dirname}/data/file.txt`; // absolute bath 

// DEMO Part 1 -- do all of this inline, in this file, to demonstrate all 3 ways to read a file

// Callback Style
fs.readFile(file, (err, data) => {
  if (err) { throw err; }
  console.log('Callback', data.toString().trim());// data is a content of the and presented as buffer .trim() to remove space
});

// Promise Style
// First, turn the normal fs.readFile into a promise
let readFilePromise = util.promisify(fs.readFile) //to use utility function :promsify function ,promsify s.t to use it
// take the contint of (fs.readFile)

// util.promisifyconverts a regular function into an async function, i.e. a function that returns a promise
// The function passed to util.promisify must follow the NodeJS callback style. The function must pass a callback as the last parameter, 
// and the callback must be the take the following parameters in the following order: (err, value) => { /* … */ }
// Promisified functions can be used with await and async to help avoid messy promise chains and introduce a cleaner, saner, way to do asynchronous programming.

// then, call it like any other promise
readFilePromise(file)
  .then(data => console.log('Promise', data.toString().trim()))
  .catch(err => { throw err; });


// Async/Await Style
// Need to make an async function and invoke it
async function readFileAsync(file) {
  try {
    let data = await readFilePromise(file);
    console.log('Async', data.toString().trim());
  }
  catch (err) { throw err }
}

readFileAsync(file);


// DEMO Part 2 -- move the logic to a library and write a couple of tests

// As a callback
reader.readerWithCallback(file, (err, data) => {
  if (err) { throw err; }
  console.log('Callback from module', data);
});

// then, call it like any other promise
reader.readerWithPromise(file)
  .then(data => console.log('Promise from module', data))
  .catch(err => { // console.error('my error',err)  //get back abuffer
  throw err; });


// Async/Await Style
// Need to make an async function and invoke it
async function readFileAsyncFromModule(file) {  // async reseved keyword which meaning this acync fun so it is need to await(reseved keyword)
  try {                                         // try and catch
    let data = await reader.readerWithPromise(file); // when data is avilable let me use it
    console.log('Async from module', data);
  }
  catch (err) { throw err }
}

readFileAsyncFromModule(file); // call a function
