### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
Using promises is the foundation of modern asynchronous JavaScript. Using fetch() for an making API calls, and using methods like then(), catch(), async and await for chaining.

- What is a Promise?
 A promise can handle an operation that isn't successful, with methods to handle the eventual success or failure of an operation.
 With a promise-based API, the asynchronous function starts the operation and returns a Promise object. You can then attach handlers to this promise object, and these handlers will be executed when the operation has succeeded or failed. You can chain promises together with fetch(), then(), and catch(). You can also combine multiple promises with Promise.all().

- What are the differences between an async function and a regular function?
A regular (or synchronous) function is run line after line, which takes a while and can prevent the user from operating multiple operations at the same time. Asynchronous code can perform multiple tasks at once. 

Asynchronous programming is a technique that enables your program to start a potentially long-running task and still be able to be responsive to other events while that task runs, rather than having to wait until that task has finished. Once that task has finished, your program is presented with the result.

- What is the difference between Node.js and Express.js?
Node.js is an open source and cross-platform runtime environment for running JavaScript on the outside of a browser. NodeJS is not a framework and it’s not a programming language itself. Most of the people are confused and understand it’s a framework or a programming language. We often use Node.js for building back-end functionality like APIs like Web App or Mobile App. It’s used by big corporations such as Paypal, Uber, Netflix, Walmart and so on. Express.js: Express is a tiny framework that sits on top of Node.js’s web server services to simplify its APIs and add useful modern features. It makes it easier to organize your application’s performance with middle ware and routing. It adds helpful tools to Node.js’s HTTP objects. It executes the creation of dynamic HTTP objects.

- What is the error-first callback pattern?
An error-first callback is a function that checks for errors first, and if there are no errors and returns a successful data response the error object becomes null.
``` js
const fs = require("fs");

// This file does not exists
const file = "file.txt";

// Error first callback
// function with two
// arguments error and data
const ErrorFirstCallback = (err, data) => {
if (err) {
	return console.log(err);
}
console.log("Function successfully executed");
};

// function execution
// This will return
// error because file do
// not exist
fs.readFile(file, ErrorFirstCallback);

```
- What is middleware?
* It is code that runs in the middle of the request / response cycle!
* In Express, middleware are functions that get access to the req and res objects and can also call the next function.
* express.json() is an example of middleware
* Our 404 and global error handler are example of middleware

It opens up the door for separating our code into more logical groupings and providing more robust / abstracted error handling.

* Logging useful information on every request
* Adding a current_user for every request (like g in Flask!)
* Ensuring that users are authenticated
* Ensuring that a user is authorized to access an endpoint

- What does the `next` function do?
* If we do not include it, we will not make it to the next route!
* Notice here we are not passing anything to next.
* If argument are passed to next, Express always treats this as an error.

```js
function logger(req, res, next) {
  console.log(`Sending ${req.method} request to ${req.path}.`);
  return next();
}
```

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

The above code snippet is slow, repetitive, lacking proper error handling, and can be written is so much more efficient ways like using Promise.all() to combine all of these API calls. And you can make a simple chain of execution involving then() and catch().

Combining Promises with Promise.all(): 

```js
const fetchPromise1 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
const fetchPromise2 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found');
const fetchPromise3 = fetch('https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');

Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
  .then((responses) => {
    for (const response of responses) {
      console.log(`${response.url}: ${response.status}`);
    }
  })
  .catch((error) => {
    console.error(`Failed to fetch: ${error}`)
  });
```