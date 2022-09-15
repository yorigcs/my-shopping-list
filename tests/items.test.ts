
import app from '../src/app';
import { createItem } from './factories/createItem'
import { prisma } from '../src/database';
import supertest from 'supertest'
describe('Testa POST /items ', () => {
  it('Deve retornar 201, se cadastrado um item no formato correto', async () => {
    const item = createItem()
    const sut = await supertest(app).post('/items').send(item)
    expect(sut.status).toBe(201)
  });
  it('Deve retornar 409, ao tentar cadastrar um item que exista', async () => {

    const item = createItem()
    await supertest(app).post('/items').send(item)
    const sut = await supertest(app).post('/items').send(item)
    expect(sut.status).toBe(409)
  });
});

describe('Testa GET /items ', () => {
  it('Deve retornar status 200 e o body no formato de Array',  async () => {
    const sut = await supertest(app).get('/items').send()
    expect(sut.status).toBe(200)
    expect(sut.body).toBeInstanceOf(Array)
  });
});

describe('Testa GET /items/:id ', () => {
  it('Deve retornar status 200 e um objeto igual a o item cadastrado', async () => {
    const item = createItem()
    const result = await supertest(app).post('/items').send(item)
    const sut = await supertest(app).get(`/items/${result.body.id}`);

    delete sut.body.id;

    expect(sut.status).toBe(200);
    expect(sut.body).toEqual(item);
  });
  it('Deve retornar status 404 caso não exista um item com esse id', async () => {
    const item = createItem()
    const result = await supertest(app).post('/items').send(item);
    const sut = await supertest(app).get(`/items/${result.body.id + 1}`)
    expect(sut.status).toBe(404);
  });
});
