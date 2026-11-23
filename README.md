# rganado.ca

Portfolio website built with a React/Vite single-page frontend and an Express JSON API. Project cards are defined in `data/projects.js` and fetched by the React client.

## Run with Docker

```sh
docker compose up --build -d
```

Visit [http://localhost:8080](http://localhost:8080). To use a different host port, run `PORT=3000 docker compose up --build -d`.

Stop the site with `docker compose down`.

## Deployment images

Pushing to `master` publishes multi-architecture images to GitHub Container Registry (GHCR). The production Compose file pulls `:latest` tags, so Dockge's **Update** button pulls the new images and recreates the stack. Before the first Dockge deployment, make the three GHCR packages public or configure Dockge's Docker host with credentials that can pull them.

## Google tag

Copy `.env.example` to `.env` and set `GOOGLE_TAG_ID` to your Google tag ID (for example, `G-XXXXXXXXXX`). The `.env` file is ignored by Git and excluded from the Docker build context. Leave the value blank to omit the tag. After changing it, run `docker compose up -d` to recreate the portfolio service with the new value.

The ID is delivered to visitors' browsers as part of the page; it is not a secret. The environment file keeps it out of the repository.

## Personal projects

Compose builds Scratch and Flower from pinned public GitHub revisions. Scratch runs as a separate Node.js service behind NGINX at `/scratch/`; Flower is served at `/flower/`. A build needs internet access to fetch the repositories and install Scratch's dependencies. Update the revision arguments in the Dockerfiles to pick up upstream changes.

Scratch uses a sample list of suggestions by default. To supply your own, set `CONTENT_MAPPING` to a JSON object mapping categories to arrays of strings in the environment before running Compose. The portfolio also links to Sleevd on the App Store.

## Local development

Install Node.js 20 or newer, then run `npm ci`, `npm --prefix client install`, and `npm --prefix client run build`. Start the API and built SPA with `npm run dev`. For frontend-only development, use `npm --prefix client run dev`. To enable the tag locally, run `node --env-file=.env server.js` after configuring `.env`. The portfolio is available at http://localhost:3000. Use Docker Compose to run Scratch and Flower alongside it at their `/scratch/` and `/flower/` paths.
