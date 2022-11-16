# Broken App Issues
* app and axios should be imported as const variables since they won't be changing on us.
* Our catch for the route should contain and error as a parameter just like next, and next should be returned to make the result stricter.
* Also added 404 and error handlers and use of an expressError.js file to issue errors with an effective constructor function. 