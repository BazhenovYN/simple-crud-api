import http from 'node:http';

import { handleRequest } from './requestController.js';

export const server = http.createServer((req, res) => {
  handleRequest(req, res);
});
