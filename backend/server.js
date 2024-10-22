const http = require('http');
const url = require('url');


const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);


    if (parsedUrl.pathname === '/') {
        // GET request to root
        if (req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end('<h1>Welcome to node server</h1>');
        }
    } else if (parsedUrl.pathname === '/update' && (req.method === 'PUT' || req.method === 'PATCH')) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const data = JSON.parse(body);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Successfully updated!', option: data.option }));
        });
    } else if (parsedUrl.pathname === '/post' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const data = JSON.parse(body);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Successfully created!', option: data.option }));
        });
    } else if (parsedUrl.pathname === '/delete' && req.method === 'DELETE') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const data = JSON.parse(body);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Successfully deleted!', option: data.option }));
        });
    } else {
     
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
});


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
