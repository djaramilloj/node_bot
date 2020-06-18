// create server that exposes data
const http = require('http');

http.createServer((request, response) => {
    response.writeHead(200, { 'content-Type': 'text/plain' })
    response.end('Hola mundo')
}).listen(8000);

console.log('servidor esta corriendo en http://localhost:8000/');
