import http from 'node:http';

import { DEFAULT_PORT, ENDPOINTS, HTTP_STATUS_CODES, MESSAGES } from './const.js';
import type { HttpRequest, IRequestParams, IRequestResult } from './types.js';
import { addNewUser, deleteUserById, getAllUsers, getUserById, updateUser } from './users.js';
import { getEndpointFromUrl, getErrorText, getIdFromUrl } from './utils.js';

const PORT = process.env.PORT ?? DEFAULT_PORT;

const executeMethod = ({ endpoint, method, params }: IRequestParams): IRequestResult => {
  if (endpoint === ENDPOINTS.users) {
    switch (method) {
      case 'GET':
        if (params.userId) {
          return getUserById(params.userId);
        } else {
          return getAllUsers();
        }
      case 'POST':
        return addNewUser(params.body);
      case 'PUT':
        return updateUser(params.userId, params.body);
      case 'DELETE':
        return deleteUserById(params.userId);
      default:
        throw new Error('Unknown method');
    }
  } else {
    return {
      statusCode: HTTP_STATUS_CODES.NOT_FOUND,
      data: getErrorText(MESSAGES.BAD_ENDPOINT),
    };
  }
};

const getRequestParams = (req: HttpRequest): IRequestParams => {
  const url = new URL(req.url ?? '', `http://${req.headers.host}`);
  const endpoint = getEndpointFromUrl(url);
  const userId = getIdFromUrl(url, endpoint);
  return {
    endpoint,
    method: req.method ?? '',
    params: {
      userId,
    },
  };
};

const server = http.createServer((req, res) => {
  try {
    const { endpoint, method, params } = getRequestParams(req);
    const result = executeMethod({ endpoint, method, params });
    res.writeHead(result.statusCode, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(result.data));
  } catch (error) {
    res.writeHead(HTTP_STATUS_CODES.SERVER_ERROR, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(getErrorText(MESSAGES.SERVER_ERROR)));
  }
});

server.on('request', (req) => {
  console.log(`${req.method} ${req.url}`);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
