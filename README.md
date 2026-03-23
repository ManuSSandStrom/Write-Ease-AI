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

## Notes

- The app works without external AI keys by using modular mock services.
- Authentication is handled through Clerk, and backend user records are synced into MongoDB on sign-in.
- The UI is designed mobile-first and can be extended into React Native later because business logic is kept isolated from view composition.
