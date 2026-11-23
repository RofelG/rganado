const request = require('supertest');
const app = require('../app');
const projects = require('../data/projects');

describe('built React site', () => {
  it('serves the React shell and its generated JavaScript entry point', async () => {
    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);
    expect(response.type).toMatch(/html/);
    expect(response.text).toContain('<div id="root"></div>');
    expect(response.text).toContain('<title>Rofel Ganado | Full-Stack Developer</title>');

    const script = response.text.match(/<script type="module"[^>]* src="([^"]+)"/);
    expect(script).not.toBeNull();

    const asset = await request(app).get(script[1]);
    expect(asset.statusCode).toBe(200);
    expect(asset.type).toMatch(/javascript/);
    expect(asset.text).toContain('createRoot');
  });

  it('returns the React shell for client-side routes', async () => {
    const [home, route] = await Promise.all([
      request(app).get('/'),
      request(app).get('/projects'),
    ]);

    expect(route.statusCode).toBe(200);
    expect(route.type).toMatch(/html/);
    expect(route.text).toBe(home.text);
  });
});

describe('portfolio API', () => {
  it('returns every project with the fields the React UI needs', async () => {
    const response = await request(app).get('/api/projects');

    expect(response.statusCode).toBe(200);
    expect(response.type).toMatch(/json/);
    expect(response.body).toEqual(projects);
    expect(response.body.length).toBeGreaterThan(0);

    response.body.forEach((project) => {
      expect(project).toEqual(expect.objectContaining({
        name: expect.any(String),
        href: expect.stringMatching(/^https?:\/\/|^\//),
        type: expect.any(String),
        description: expect.any(String),
        tags: expect.arrayContaining([expect.any(String)]),
      }));
      expect(project.name).not.toHaveLength(0);
      expect(project.description).not.toHaveLength(0);
      if (project.image) {
        expect(project).toEqual(expect.objectContaining({
          image: expect.stringMatching(/^\//),
          imageClass: expect.any(String),
          imageAlt: expect.any(String),
        }));
      }
    });
  });

  it('returns the configured Google tag ID', async () => {
    const configuredApp = app.createApp({ tagId: 'G-ABCD1234' });
    const response = await request(configuredApp).get('/api/config');

    expect(response.statusCode).toBe(200);
    expect(response.type).toMatch(/json/);
    expect(response.body).toEqual({ tagId: 'G-ABCD1234' });
  });

  it('rejects an invalid Google tag ID during application setup', () => {
    expect(() => app.createApp({ tagId: 'not-a-google-tag' })).toThrow(
      'GOOGLE_TAG_ID must be a Google tag ID',
    );
  });
});
