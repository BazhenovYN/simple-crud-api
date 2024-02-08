import http from 'node:http';

export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export type NewUserData = Omit<IUser, 'id'>;

export interface IRequestParams {
  endpoint: string;
  method: string;
  params: {
    userId?: string;
    body?: NewUserData;
  };
}

export interface ErrorMessage {
  message: string;
}

export interface IRequestResult {
  statusCode: number;
  data: IUser | IUser[] | ErrorMessage;
}

export type HttpRequest = http.IncomingMessage;

export type HttpResponse = http.ServerResponse<http.IncomingMessage> & {
  req: http.IncomingMessage;
};
