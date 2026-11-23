# Project Architecture: Portfolio

## Overview
This document defines the architectural decisions, technology stack, and development standards for the Portfolio project. It serves as a single source of truth for AI agents and developers to maintain consistency.

## Tech Stack

### Backend
- **Runtime**: Node.js (Version 20+)
- **Web Framework**: [Express.js](https://expressjs.com/)
- **Template Engine**: [EJS](https://ejs.co/) (Embedded JavaScript templates)

### Frontend
- **Styling**: Vanilla CSS
- **Interactivity**: Vanilla JavaScript
- **Rendering Strategy**: Server-Side Rendering (SSR) via EJS

### Infrastructure & Deployment
- **Containerization**: Docker
- **Web Server**: Nginx (configured via `nginx.conf`)
- **Orchestration**: Docker Compose (`compose.yaml`)

## Project Structure

```text
.
├── data/               # Data-driven content (e.g., projects.js)
├── docker/             # Docker-related configurations
├── img/                # Images and visual assets
├── js/                 # Client-side JavaScript files
├── css/                # Stylesheets
├── views/              # EJS templates (UI components and pages)
├── server.js           # Main application entry point
├── package.json        # Node.js dependencies and scripts
├── compose.yaml        # Docker Compose configuration
└── Dockerfile          # Docker image definition
