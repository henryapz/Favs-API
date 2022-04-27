const supertest = require('supertest');
const mongoose = require('mongoose');
const { app, server } = require('./index');

const api = supertest(app);

test('Test if API is running', async () => {
  await api
    .get('/')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
