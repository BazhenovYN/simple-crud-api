import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

import { HTTP_STATUS_CODES, USERS_ENDPOINT } from '../const.js';
import { server } from '../server.js';
import { NewUserData } from '../types.js';

const NON_EXISTING_ENDPOINT = '/some/non-existing/resource';

const testUser: NewUserData = {
  username: 'John Dow',
  age: 23,
  hobbies: ['football', 'basketball'],
};
const updatedTestUser: NewUserData = {
  username: 'John Smith',
  age: 25,
  hobbies: ['soccer', 'basketball'],
};

const randomUserId = uuidv4();
const invalidUserId = 1;

describe('http server', () => {
  describe('1. should correctly execute CRUD operations', () => {
    test('GET api/users request returns empty array', async () => {
      const response = await request(server).get(USERS_ENDPOINT);

      expect(response.statusCode).toBe(HTTP_STATUS_CODES.OK);
      expect(response.body).toEqual([]);
    });

    test('POST api/users request creates a new user', async () => {
      const response = await request(server).post(USERS_ENDPOINT).send(testUser);

      expect(response.statusCode).toBe(HTTP_STATUS_CODES.CREATED);
      expect(response.body).toEqual({
        id: expect.any(String),
        ...testUser,
      });
    });

    test('GET api/users/{userId} request returns the created record', async () => {
      const createResponse = await request(server).post(USERS_ENDPOINT).send(testUser);
      const { id } = createResponse.body;

      const getResponse = await request(server).get(`${USERS_ENDPOINT}/${id}`);

      expect(getResponse.statusCode).toBe(HTTP_STATUS_CODES.OK);
      expect(getResponse.body).toEqual({
        id,
        ...testUser,
      });
    });

    test('PUT api/users/{userId} request updates the created record', async () => {
      const createResponse = await request(server).post(USERS_ENDPOINT).send(testUser);
      const { id } = createResponse.body;

      const response = await request(server).put(`${USERS_ENDPOINT}/${id}`).send(updatedTestUser);

      expect(response.statusCode).toBe(HTTP_STATUS_CODES.OK);
      expect(response.body).toEqual({
        id,
        ...updatedTestUser,
      });
    });

    test('DELETE api/users/{userId} request deletes the created record', async () => {
      const createResponse = await request(server).post(USERS_ENDPOINT).send(testUser);
      const { id } = createResponse.body;

      const response = await request(server).delete(`${USERS_ENDPOINT}/${id}`);

      expect(response.statusCode).toBe(HTTP_STATUS_CODES.NO_CONTENT);
    });
  });

  describe('2. should return a 404 status code if the user does not exist', () => {
    test('GET api/users/{userId}', async () => {
      const response = await request(server).get(`${USERS_ENDPOINT}/${randomUserId}`);

      expect(response.statusCode).toBe(HTTP_STATUS_CODES.NOT_FOUND);
    });

    test('PUT api/users/{userId}', async () => {
      const response = await request(server)
        .put(`${USERS_ENDPOINT}/${randomUserId}`)
        .send(updatedTestUser);

      expect(response.statusCode).toBe(HTTP_STATUS_CODES.NOT_FOUND);
    });

    test('DELETE api/users/{userId}', async () => {
      const response = await request(server).delete(`${USERS_ENDPOINT}/${randomUserId}`);

      expect(response.statusCode).toBe(HTTP_STATUS_CODES.NOT_FOUND);
    });
  });

  describe('3. should return a 404 status code if endpoint does not exist', () => {
    test('/some-non-existing-endpoint', async () => {
      const response = await request(server).get(NON_EXISTING_ENDPOINT);
      expect(response.statusCode).toBe(HTTP_STATUS_CODES.NOT_FOUND);
    });
  });

  describe('4. should return a 400 status code if the request contains invalid data', () => {
    test('GET api/users/{userId}', async () => {
      const response = await request(server).get(`${USERS_ENDPOINT}/${invalidUserId}`);

      expect(response.statusCode).toBe(HTTP_STATUS_CODES.BAD_REQUEST);
    });

    test('POST api/users', async () => {
      const response = await request(server).post(USERS_ENDPOINT).send({
        name: 'John Dow',
      });

      expect(response.statusCode).toBe(HTTP_STATUS_CODES.BAD_REQUEST);
    });

    test('PUT api/users/{userId}', async () => {
      const response = await request(server)
        .put(`${USERS_ENDPOINT}/${invalidUserId}`)
        .send(updatedTestUser);

      expect(response.statusCode).toBe(HTTP_STATUS_CODES.BAD_REQUEST);
    });

    test('DELETE api/users/{userId}', async () => {
      const response = await request(server).delete(`${USERS_ENDPOINT}/${invalidUserId}`);

      expect(response.statusCode).toBe(HTTP_STATUS_CODES.BAD_REQUEST);
    });
  });
});
