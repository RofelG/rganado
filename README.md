# rganado.ca

Portfolio Website

## Run with Docker

```sh
docker compose up --build -d
```

Visit [http://localhost:8080](http://localhost:8080). To use a different host port, run `PORT=3000 docker compose up --build -d`.

Stop the site with `docker compose down`.

## Personal projects

Compose builds Scratch and Flower from pinned public GitHub revisions. Scratch runs as a separate Node.js service behind NGINX at `/scratch/`; Flower is served at `/flower/`. A build needs internet access to fetch the repositories and install Scratch's dependencies. Update the revision arguments in the Dockerfiles to pick up upstream changes.

Scratch uses a sample list of suggestions by default. To supply your own, set `CONTENT_MAPPING` to a JSON object mapping categories to arrays of strings in the environment before running Compose. The portfolio also links to Sleevd on the App Store.
