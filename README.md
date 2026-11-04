# rganado.ca

Portfolio website built with Node.js, Express, and EJS. Project cards are defined in `data/projects.js` and rendered by the server.

## Run with Docker

```sh
docker compose up --build -d
```

Visit [http://localhost:8080](http://localhost:8080). To use a different host port, run `PORT=3000 docker compose up --build -d`.

Stop the site with `docker compose down`.

## Google tag

Copy `.env.example` to `.env` and set `GOOGLE_TAG_ID` to your Google tag ID (for example, `G-XXXXXXXXXX`). The `.env` file is ignored by Git and excluded from the Docker build context. Leave the value blank to omit the tag. After changing it, run `docker compose up -d` to recreate the portfolio service with the new value.

The ID is delivered to visitors' browsers as part of the page; it is not a secret. The environment file keeps it out of the repository.

## Personal projects

Compose builds Scratch and Flower from pinned public GitHub revisions. Scratch runs as a separate Node.js service behind NGINX at `/scratch/`; Flower is served at `/flower/`. A build needs internet access to fetch the repositories and install Scratch's dependencies. Update the revision arguments in the Dockerfiles to pick up upstream changes.

Scratch uses a sample list of suggestions by default. To supply your own, set `CONTENT_MAPPING` to a JSON object mapping categories to arrays of strings in the environment before running Compose. The portfolio also links to Sleevd on the App Store.

## Local development

Install Node.js 20 or newer, then run `npm ci` and `npm run dev`. To enable the tag locally, run `node --env-file=.env server.js` after configuring `.env`. The portfolio is available at http://localhost:3000. Use Docker Compose to run Scratch and Flower alongside it at their `/scratch/` and `/flower/` paths.
