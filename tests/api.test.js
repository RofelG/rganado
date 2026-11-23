const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
  it('should respond with 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});

describe('API endpoints', () => {
  describe('GET /api/projects', () => {
    it('should return projects as JSON', async () => {
      const response = await request(app).get('/api/projects');
      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /api/config', () => {
    it('should return config as JSON', async () => {
      const response = await request(app).get('/api/config');
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('tagId');
    });
  });
});
