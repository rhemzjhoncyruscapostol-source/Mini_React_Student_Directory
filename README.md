# Student Directory

A mini React app built for the "Mini React Student Directory" group activity.
Displays a list of students using a reusable `StudentCard` component, with
props for student info and `useState` for a per-student favorite counter.

## Getting Started

```bash
npm install
npm run dev
```

## Deploying to Render

Deploy this Vite app as a **Static Site** on Render:

- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`
- **Start Command:** leave empty

The repository includes a `render.yaml` Blueprint with these settings. If you
choose Render **Web Service** instead, use:

- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`

## Project Structure

```
src/
  App.jsx          # Renders the list of StudentCard components
  StudentCard.jsx  # Reusable card component (props + useState)
  main.jsx         # React entry point
  index.css        # Styling
```

## Students

- Abache, Noreal — 3rd Year
- Apostol, Rhemz Jhon Cyrus C. — 3rd Year
- Goot, Pholl Vincent — 3rd Year
- Torres, John Francis — 3rd Year
