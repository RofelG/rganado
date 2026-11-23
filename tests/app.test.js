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
    expect(res.text).toContain('href="/favicon.svg"');

    const favicon = await request(app).get('/favicon.svg');
    expect(favicon.statusCode).toBe(200);
    expect(favicon.type).toMatch(/image\/svg\+xml/);
    expect(favicon.body.toString('utf8')).toContain('<title id="title">RG</title>');
  });
});
