const http = require("http");
const fs = require('fs');

const port = 3000;

const app = http.createServer((req, res) => {
    let fileName = "";

    switch (req.url) {
        case '/':
            fileName = 'Home.html';
            break;
        case '/about':
            fileName = 'About.html';
            break;
        case '/login':
            fileName = 'Login.html';
            break;
        case '/header':
            fileName = 'header.html';
            break;
        case '/read':
            fileName = 'read.html';
            break;
        case '/cart':
            fileName = 'cart.html';
            break;
        case '/review':
            fileName = 'review.html';
            break;
        default:
            fileName = 'contact.html';
    }

    fs.readFile(fileName, (err, pagename) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - Page Not Found</h1>');
            console.error(`Error reading file: ${fileName}.`, err);
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(pagename);
        }
    });
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server is Running On Port :- ${port}`);
});
