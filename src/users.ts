import { validate, v4 as uuidv4 } from 'uuid';

import { HTTP_STATUS_CODES, MESSAGES } from './const.js';
import type { IRequestResult, IUser, NewUserData } from './types.js';
import { getErrorText } from './utils.js';

const users: IUser[] = [];

const isUserDataValid = (data: Partial<NewUserData>) => {
  if (!(data.username && data.age && data.hobbies)) {
    return false;
  }
  if (typeof data.username !== 'string') {
    return false;
  }
  if (typeof data.age !== 'number') {
    return false;
  }
  if (!Array.isArray(data.hobbies)) {
    return false;
  }
  if (data.hobbies.some((element) => typeof element !== 'string')) {
    return false;
  }
  return true;
};

export const getUserById = (userId: string): IRequestResult => {
  if (!validate(userId)) {
    return {
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      data: getErrorText(MESSAGES.BAD_UUID),
    };
  }

  const data = users.find((user) => user.id === userId);

  if (!data) {
    return {
      statusCode: HTTP_STATUS_CODES.NOT_FOUND,
      data: getErrorText(MESSAGES.NOT_FOUND),
    };
  }
  return {
    statusCode: HTTP_STATUS_CODES.OK,
    data,
  };
};

export const getAllUsers = (): IRequestResult => {
  return {
    statusCode: HTTP_STATUS_CODES.OK,
    data: users,
  };
};

export const addNewUser = (data?: NewUserData): IRequestResult => {
  if (!data || !isUserDataValid(data)) {
    return {
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      data: getErrorText(MESSAGES.BAD_USER_DATA),
    };
  }

  const newUser = { id: uuidv4(), ...data };
  users.push(newUser);

  return {
    statusCode: HTTP_STATUS_CODES.CREATED,
    data: newUser,
  };
};

export const updateUser = (userId?: string, data?: Partial<NewUserData>): IRequestResult => {
  if (!userId || !validate(userId)) {
    return {
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      data: getErrorText(MESSAGES.BAD_UUID),
    };
  }

  if (!data || !isUserDataValid(data)) {
    return {
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      data: getErrorText(MESSAGES.BAD_USER_DATA),
    };
  }

  const user = users.find((user) => user.id === userId);

  if (!user) {
    return {
      statusCode: HTTP_STATUS_CODES.NOT_FOUND,
      data: getErrorText(MESSAGES.NOT_FOUND),
    };
  }

  Object.assign(user, data);

  return {
    statusCode: HTTP_STATUS_CODES.OK,
    data: user,
  };
};

export const deleteUserById = (userId?: string): IRequestResult => {
  if (!userId || !validate(userId)) {
    return {
      statusCode: HTTP_STATUS_CODES.BAD_REQUEST,
      data: getErrorText(MESSAGES.BAD_UUID),
    };
  }

  const index = users.findIndex((user) => user.id === userId);

  if (index < 0) {
    return {
      statusCode: HTTP_STATUS_CODES.NOT_FOUND,
      data: getErrorText(MESSAGES.NOT_FOUND),
    };
  }

  const removedUser = users.splice(index, 1);

  return {
    statusCode: HTTP_STATUS_CODES.OK,
    data: removedUser[0],
  };
};
