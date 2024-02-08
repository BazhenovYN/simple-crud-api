import { USERS_ENDPOINT } from './const.js';

export const getErrorText = (message: string) => {
  return {
    message,
  };
};

export const getEndpointFromUrl = (url: URL) => {
  if (url.pathname.startsWith(USERS_ENDPOINT)) {
    return USERS_ENDPOINT;
  }

  return url.pathname;
};

export const getIdFromUrl = (url: URL, endpoint: string) => {
  return url.pathname.replace(endpoint, '').replace('/', '');
};
