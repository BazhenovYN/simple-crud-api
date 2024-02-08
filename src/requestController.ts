import { USERS_ENDPOINT, HTTP_REQUEST_METHODS, HTTP_STATUS_CODES, MESSAGES } from './const.js';
import type {
  HttpRequest,
  HttpResponse,
  IRequestParams,
  IRequestResult,
  NewUserData,
} from './types.js';
import { addNewUser, deleteUserById, getAllUsers, getUserById, updateUser } from './users.js';
import { getEndpointFromUrl, getErrorText, getIdFromUrl } from './utils.js';

const executeMethod = ({ endpoint, method, params }: IRequestParams): IRequestResult => {
  if (endpoint === USERS_ENDPOINT) {
    switch (method) {
      case HTTP_REQUEST_METHODS.GET:
        if (params.userId) {
          return getUserById(params.userId);
        } else {
          return getAllUsers();
        }
      case HTTP_REQUEST_METHODS.POST:
        return addNewUser(params.body);
      case HTTP_REQUEST_METHODS.PUT:
        return updateUser(params.userId, params.body);
      case HTTP_REQUEST_METHODS.DELETE:
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

const getRequestBody = (req: HttpRequest): Promise<NewUserData> => {
  return new Promise((resolve, reject) => {
    let acc = '';

    req.on('data', (chunk) => {
      acc += chunk;
    });

    req.on('end', () => {
      try {
        const body: NewUserData = acc ? JSON.parse(acc) : {};
        resolve(body);
      } catch (error) {
        reject(error);
      }
    });
  });
};

const getRequestParams = async (req: HttpRequest): Promise<IRequestParams> => {
  const url = new URL(req.url ?? '', `http://${req.headers.host}`);
  const endpoint = getEndpointFromUrl(url);
  const userId = getIdFromUrl(url, endpoint);
  const body = await getRequestBody(req);
  return {
    endpoint,
    method: req.method ?? '',
    params: {
      userId,
      body,
    },
  };
};

export const handleRequest = async (req: HttpRequest, res: HttpResponse) => {
  try {
    const { endpoint, method, params } = await getRequestParams(req);
    const result = executeMethod({ endpoint, method, params });
    res.writeHead(result.statusCode, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(result.data));
  } catch (error) {
    res.writeHead(HTTP_STATUS_CODES.SERVER_ERROR, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(getErrorText(MESSAGES.SERVER_ERROR)));
  }
};
