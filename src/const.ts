export const DEFAULT_PORT = 4000;

export const HTTP_REQUEST_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

export const USERS_ENDPOINT = '/api/users';

export const MESSAGES = {
  BAD_UUID: 'UUID is incorrect',
  NOT_FOUND: 'Data not found',
  BAD_USER_DATA: 'User data is incorrect',
  BAD_ENDPOINT: 'Endpoint is incorrect',
  SERVER_ERROR: 'Internal Server Error',
};
