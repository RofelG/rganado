# Design Document

## Overview
This document outlines the design principles and structural components of the React-based frontend and the Express REST API.

## Frontend Design

### Component-Based Architecture
The frontend is built using React components to ensure reusability and maintainability.

Key Components:
- `Navbar`: Navigation menu.
- `Hero`: Introduction section.
- `About`: Information about the person/entity.
- `Projects`: A list of projects fetched from the API.
- `Homelab`: Details about the homelab setup.
- `Contact`: Contact information or form.
- `Footer`: Page footer.

### State Management
- **Local State:** Managed using React hooks (`useState`, `useReducer`) for component-specific logic (e.g., form inputs, UI toggles).
- **Data Fetching:** Managed using the `useEffect` hook to fetch data from the backend on component mount.

### Styling
- **Bootstrap:** Used for layout and standard UI components.
- **Custom CSS:** For specialized styling and animations.
- **Animations:** Custom scroll-based spring animations for card elements.

## Backend Design

### RESTful API
The backend serves as a stateless API providing data in JSON format.

Endpoints:
- `GET /api/projects`: Returns a list of projects.
- `GET /api/config`: Returns application configuration.

## Data Flow
1. React components initiate `fetch` requests to the Express backend.
2. The backend retrieves data from the data source (e.g., `data/projects.js`).
3. The backend returns JSON responses.
4. React components update their state and re-render the UI.
