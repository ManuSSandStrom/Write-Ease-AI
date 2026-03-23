# WriteEase AI

WriteEase AI is a mobile-first MERN productivity application for AI-assisted writing, research support, plagiarism checks, and resume building. The project is structured so the frontend and backend can be deployed independently.

## Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, Redux Toolkit, React Hook Form
- Backend: Node.js, Express, MongoDB, Mongoose, Clerk
- Export: PDF, DOCX, TXT

## Project Structure

```text
WriteEase AI/
  backend/
  frontend/
  .gitignore
  README.md
```

## Backend Setup

1. Navigate to `backend`
2. Install dependencies:

```bash
npm install
```

3. Create `.env` from `.env.example`
4. Start development server:

```bash
npm run dev
```

5. Seed starter templates:

```bash
npm run seed
```

## Frontend Setup

1. Navigate to `frontend`
2. Install dependencies:

```bash
npm install
```

3. Create `.env` from `.env.example`
4. Start development server:

```bash
npm run dev
```

## Environment Variables

### Backend

See `backend/.env.example`

- `PORT`
- `MONGODB_URI`
- `CLIENT_URL`
- `AI_PROVIDER`
- `AI_API_KEY`
- `CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `START_WITHOUT_DB`

### Frontend

See `frontend/.env.example`

- `VITE_API_URL`
- `VITE_CLERK_PUBLISHABLE_KEY`

## Production Build

### Frontend

```bash
npm run build
```

### Backend

Run the Node server with production environment variables. A process manager like PM2 or a container runtime is recommended.

## Deployment

### Backend on Render

Use the repo root and deploy the backend service from `backend/`.

Render settings:

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/api/health`

Backend environment variables:

- `NODE_ENV=production`
- `PORT=10000`
- `MONGODB_URI=your_mongodb_connection_string`
- `CLIENT_URL=https://your-netlify-site.netlify.app`
- `ALLOWED_ORIGINS=https://your-netlify-site.netlify.app,http://localhost:5173`
- `AI_PROVIDER=mock`
- `AI_API_KEY=your_ai_key`
- `CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key`
- `CLERK_SECRET_KEY=your_clerk_secret_key`
- `START_WITHOUT_DB=false`

### Frontend on Netlify

Use the repo root and deploy the frontend from `frontend/`.

Netlify settings:

- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `dist`

Frontend environment variables:

- `VITE_API_URL=https://your-render-service.onrender.com/api`
- `VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key`

### CLI Commands

Render blueprint:

```bash
render blueprint launch
```

Netlify CLI:

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --build
netlify deploy --build --prod
```

## Notes

- The app works without external AI keys by using modular mock services.
- Authentication is handled through Clerk, and backend user records are synced into MongoDB on sign-in.
- The UI is designed mobile-first and can be extended into React Native later because business logic is kept isolated from view composition.
