const request = require('supertest');
const app = require('../app');

describe('Express App', () => {
  it('should return 200 for a valid API endpoint', async () => {
    const res = await request(app).get('/api/config');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('tagId');
  });

  it('serves the React application for client routes', async () => {
    const res = await request(app).get('/some-unknown-route');
    expect(res.statusCode).toBe(200);
    expect(res.type).toMatch(/html/);
    expect(res.text).toContain('<div id="root"></div>');
  });
});
