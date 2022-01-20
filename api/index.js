import { createServer } from 'http';
import { last, map, Observable, scan } from 'rxjs';
import { WebSocketServer } from 'ws';

const sockets = [];

createServer((req, res) => {
    new Observable(observer => {
        req.on('data', chunk => observer.next(chunk));
        req.on('end', () => observer.complete());
        req.on('error', err => observer.error(err));
    }).pipe(
        scan((acc, chunk) => acc + chunk, ''),
        last(),
        map(data => JSON.parse(data)),
    ).subscribe(data => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(data));
        console.log(data);
        sockets.forEach(socket => socket.send(JSON.stringify(data)));
    }, err => {
        res.end();
    });
}).listen(8000);

new WebSocketServer({port: 8001}).on('connection', socket => sockets.push(socket));