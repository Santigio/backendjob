const request = require('supertest');
const app = require('../app');

describe('GET /api/users/top', () => {
  it('should return the top users for the past day', async () => {
    const res = await request(app).get('/api/users/top');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should return the top users for the past 7 days', async () => {
    const res = await request(app).get('/api/users/top?time_period=7d');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should return the top users for the past 30 days', async () => {
    const res = await request(app).get('/api/users/top?time_period=30d');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should return a specific page of results', async () => {
    const res = await request(app).get('/api/users/top?page=2');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should return a specific number of results per page', async () => {
    const res = await request(app).get('/api/users/top?limit=20');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
    expect(res.body.length).toEqual(20);
  });

  it('should return an error for an invalid time period', async () => {
    const res = await request(app).get('/api/users/top?time_period=invalid');
    expect(res.statusCode).toEqual(500);
    expect(res.body).toBeDefined();
    expect(res.body.error).toBeDefined();
  });

})
