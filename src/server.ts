import http from 'node:http';

import { DEFAULT_PORT } from './const.js';
import { handleRequest } from './requestController.js';

const PORT = process.env.PORT ?? DEFAULT_PORT;

const server = http.createServer((req, res) => {
  handleRequest(req, res);
});

server.on('request', (req) => {
  console.log(`${req.method}\t ${req.url}`);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
