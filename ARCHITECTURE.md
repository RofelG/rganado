# Architecture Document

## Overview
This project has been migrated from a monolithic Server-Side Rendering (SSR) architecture using Express and EJS to a decoupled Client-Server architecture.

## Architecture Pattern
The application follows a **Single Page Application (SPA)** pattern.

### 1. Frontend (Client)
- **Framework:** React (managed by Vite)
- **Build Tool:** Vite
- **Responsibilities:**
  - User Interface (UI) and User Experience (UX) logic.
  - Client-side routing (if applicable).
  - Data fetching from the Backend API.
  - Managing local UI state.

### 2. Backend (Server)
- **Framework:** Express.js
- **Responsibilities:**
  - Serving as a RESTful API.
  - Providing data (Projects, Configuration) as JSON.
  - Serving static assets.
  - Handling business logic and data persistence.

## Communication
The Client communicates with the Server via **RESTful API** calls using the standard `fetch` API. All data is exchanged in **JSON** format.

## Data Flow
1. The React application initializes and fetches configuration from `/api/config`.
2. The React application fetches project data from `/api/projects`.
3. The Backend processes requests and returns JSON responses.
4. The Frontend updates the UI based on the received data.

## Deployment
The application consists of two main parts:
- The backend server (Express).
- The frontend build (Vite production build).

In production, the Express server is typically configured to serve the static files from the frontend's `dist` directory.
