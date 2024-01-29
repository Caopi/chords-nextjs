const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const ws = require('ws');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
 
let viewers = [];

app.prepare().then(() => {
    const server = createServer(async (req, res) => {
        try {
            // Be sure to pass `true` as the second argument to `url.parse`.
            // This tells it to parse the query portion of the URL.
            const parsedUrl = parse(req.url, true);
            const { pathname, query } = parsedUrl;
            console.log(`${pathname}:${parsedUrl.path}`);

            await handle(req, res, parsedUrl);
        } catch (err) {
            console.error('Error occurred handling', req.url, err);
            res.statusCode = 500;
            res.end('internal server error');
        }
    });

    const wsServer = new ws.Server({ noServer: true });
    wsServer.on('connection', (socket) => {
        viewers.push(socket);
        socket.on('message', (data) => {
            if (data == 'ping') {
                socket.send('pong');
                return;
            }
            for (viewer of viewers) {
                viewer.send(data);
            }
        });
    });

    server
        .on('upgrade', (request, socket, head) => {
            wsServer.handleUpgrade(request, socket, head, (ws) => {
                wsServer.emit('connection', ws, request);
            });
        })
        .once('error', (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
})


// const http = require('http');
// const ws = require('ws');
// const wsServer = new ws.Server({ noServer: true });

// const server = http.createServer();
// let viewers = [];
// server.on('upgrade', (request, socket, head) => {
//     wsServer.handleUpgrade(request, socket, head, (ws) => {
//       wsServer.emit('connection', ws, request);
//     });
// });

// server.on('request', (req, res) => {
//     res.writeHead(404);
//     res.end("Not found");
// });

// wsServer.on('connection', (socket) => {
//     viewers.push(socket);
//     socket.on('message', (data) => {
//         if (data == 'ping') {
//             socket.send('pong');
//             return;
//         }
//         for (viewer of viewers) {
//             viewer.send(data);
//         }
//     });
// });

// server.listen(3000);
