import { ENDPOINTS } from './const.js';

export const getErrorText = (message: string) => {
  return {
    message,
  };
};

export const getEndpointFromUrl = (url: URL) => {
  if (url.pathname.startsWith(ENDPOINTS.users)) {
    return ENDPOINTS.users;
  }

  return url.pathname;
};

export const getIdFromUrl = (url: URL, endpoint: string) => {
  return url.pathname.replace(endpoint, '').replace('/', '');
};
