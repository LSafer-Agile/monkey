const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')

process.env.BWD = path.join(process.cwd(), process.env.BWD) || process.cwd()

const CONFIG_PATH = path.join(process.env.BWD, 'bundle/config/.env')
const DEFAULT_CONFIG_PATH = path.join(process.env.BWD, 'bundle/config/.default.env')

dotenv.config({path: DEFAULT_CONFIG_PATH})
if (fs.existsSync(CONFIG_PATH))
    Object.entries(dotenv.parse(fs.readFileSync(CONFIG_PATH)))
        .forEach(([name, value]) => process.env[name] = value as string)

import http from 'http';
import debug from "debug";
import {app} from './app'

const PORT = process.env.PORT

app.set('port', PORT)

const server = http.createServer(app)

// Error
server.on('error', error => {
    // @ts-ignore
    if (error.syscall !== 'listen') {
        throw error;
    }

    // noinspection SuspiciousTypeOfGuard
    const bind = typeof PORT === 'string'
        ? 'Pipe ' + PORT
        : 'Port ' + PORT;

    // handle specific listen errors with friendly messages
    // @ts-ignore
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
})
// Startup
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string'
        ? 'pipe ' + address
        : 'port ' + address?.port;
    debug('Listening on ' + bind);
});

server.listen(PORT)
