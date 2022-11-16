// Write a Command-Line Script

// Write a script, urls.js, that does the following:

// It is called on the command line like node urls.js FILENAME, and it reads the contents of FILENAME (each line of that file will be a URL).
// For each URL, it will get that page (a GET request to the URL) and save the HTML in a new file.
// For each URL, the output filename should be the hostname of the URL. For example, for the input URL http://yahoo.com/blah/blah,
// your script should write the contents to a plain text file called yahoo.com

// Handle Errors
// If you cannot read the original file (FILENAME), immediately end your script with an error printed to the console.
// If you cannot download a particular URL or cannot write to a particular output file, print an error to the console saying so,
// but continue on with the rest of the script.

// 1. Take a command line call like node urls.js FILENAME, and read the url contents of the FILENAME.
// 2. For every URL, make a GET request and save the HTML to a new file with the hostname of the URL as the output filename.

const fs = require('fs');
const process = require('process');
const axios = require('axios');
const path = require('path');

// let path = process.argv[2]
// let url = new URL("www.sample.com");
// let hostname = url.hostname;


function handleOut(text, out) {
    if (out){
        fs.writeFile(path.join(__dirname, `${out}`), text, error => {
            if (error) {
                console.log(`Can't write ${out}, ${error}`)
                process.exit(1)
            }
        })
    } else {
        // console.log(text);
        console.log(`Wrote to ${hostname}`)
    }
}

async function webToFile(href, hostname) {
    try {
        const response = await axios.get(href);
        handleOut(response.data, hostname);
        // console.log(`Wrote to ${hostname}`)
    } catch (error) {
        console.log(`Could not download ${href}`)
    }
}

function handleFile(file) {
    fs.readFile(path.join(__dirname, `${file}`), 'utf8', error => {
        if (error) {
            console.log(`${error}, ${file}`);
            process.exit(1);
        } else {
            let arr = fs.readFileSync(file).toString().split('\n');
            for (i in arr) {
                let url = new URL(arr[i])
                console.log(url)
                let hostname = url.hostname
                let href = url.href
                webToFile(href, hostname)
            }
        }
    });
}

handleFile(process.argv[2]);
