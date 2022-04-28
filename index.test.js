const supertest = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { app, server } = require('./index');
const User = require('./api/user/user.model');
const Item = require('./api/item/item.model');
const FavItem = require('./api/favoriteList/favoriteList.model');

const api = supertest(app);

const userData = {
  email: 'henry@gmail.com',
  password: 'N1ngun4@1',
};

const userIdOne = mongoose.Types.ObjectId();
const userTest = {
  _id: userIdOne,
  email: 'henrytest@gmail.com',
  password: 'N1ngun4@1',
  token: jwt.sign(
    { userId: userIdOne, email: 'henrytest@gmail.com' },
    process.env.TOKEN_KEY
  ),
};

const itemFav = [
  {
    title: 'Polera Gris',
    description: 'Polera marca La Coste exclusiva edición otoño 2022',
    link: 'https://www.fakestore.com/65132121165432',
  },
  {
    title: 'Pantalón Marrón',
    description: 'Pantalón Marrón exclusiva edición otoño 2022',
    link: 'https://www.fakestore.com/47862135465435',
  },
  {
    title: 'Casaca Roja',
    description: 'Casaca Roja exclusiva edición invierno 2022',
    link: 'https://www.fakestore.com/14987651322154',
  },
];

const item1 = new Item(itemFav[0]);
const item2 = new Item(itemFav[1]);
const item3 = new Item(itemFav[2]);

beforeAll(async () => {
  // Cleaning dev database
  await FavItem.deleteMany({});
  await Item.deleteMany({});
  await User.deleteMany({});

  // Creating initial items

  await item1.save();
  await item2.save();
  await item3.save();

  const user = new User(userTest);
  await user.save();
});

test('API is running', async () => {
  await api
    .get('/')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('Test of User Creation', async () => {
  await api
    .post('/api/users/createUser')
    .send(userData)
    .expect(201)
    .expect('Content-Type', /application\/json/);
});

test('Should not allow duplicated email', async () => {
  const resp = await api
    .post('/api/users/createUser')
    .send(userData)
    .expect(409)
    .expect('Content-Type', /application\/json/);

  expect(resp.body).toStrictEqual({
    error: 'User Already Exist. Please Login',
  });
});

test('User should not Login', async () => {
  const user = {
    email: 'henry@gmail.com',
    password: 'password',
  };
  const resp = await api
    .post('/api/users/login')
    .send(user)
    .expect(401)
    .expect('Content-Type', /application\/json/);
  expect(resp.body).toStrictEqual({ error: 'Invalid Credentials' });
});

test('User should Login', async () => {
  const resp = await api
    .post('/api/users/login')
    .send(userData)
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(resp.body).toHaveProperty('token');
});

test('Item should be create', async () => {
  const item = {
    title: 'Camisa negra',
    description: 'Camisa negra verano 2022',
    link: 'https://www.fakestore.com/3456788234234',
  };
  await api
    .post('/api/items/createItem')
    .send(item)
    .expect(201)
    .expect('Content-Type', /application\/json/);
});

test('Item should not be created', async () => {
  const item = {
    description: 'Camisa negra verano 2022',
    link: 'https://www.fakestore.com/3456788234234',
  };
  const resp = await api
    .post('/api/items/createItem')
    .send(item)
    .expect(400)
    .expect('Content-Type', /application\/json/);
  expect(resp.body).toStrictEqual({ error: 'title is required' });
});

test('Should create a Fav List', async () => {
  const dataTest = {
    name: 'Fav test',
    favItems: [item1.id, item2.id, item3.id],
  };
  const dataTest2 = {
    name: 'Fav test 2',
    favItems: [item1.id, item2.id],
  };
  await api
    .post('/api/favs/')
    .set('Authorization', `Bearer ${userTest.token}`)
    .send(dataTest)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  await api
    .post('/api/favs/')
    .set('Authorization', `Bearer ${userTest.token}`)
    .send(dataTest2)
    .expect(201)
    .expect('Content-Type', /application\/json/);
});

test('Should not create a Fav List with duplicated name', async () => {
  const dataTest = {
    name: 'Fav test',
    favItems: [item1.id, item2.id, item3.id],
  };

  const resp = await api
    .post('/api/favs/')
    .set('Authorization', `Bearer ${userTest.token}`)
    .send(dataTest)
    .expect(409)
    .expect('Content-Type', /application\/json/);

  expect(resp.body).toStrictEqual({
    error: 'User already has a list with the given name',
  });
});

test('Should not create a Fav List without name', async () => {
  const dataTest = {
    favItems: [item1.id, item2.id, item3.id],
  };
  const resp = await api
    .post('/api/favs/')
    .set('Authorization', `Bearer ${userTest.token}`)
    .send(dataTest)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  expect(resp.body).toStrictEqual({ error: 'Favorite List name is required' });
});

test('Should return all Fav List', async () => {
  const req = await api
    .get('/api/favs/')
    .set('Authorization', `Bearer ${userTest.token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(req.body).toHaveLength(2);
});

afterAll(() => {
  mongoose.connection.close();
  server.close();
});
