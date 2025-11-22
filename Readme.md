# Todo Assignment

This repository contains a full-stack Todo application with a TypeScript/Express backend and a React + Vite frontend. The README below explains how to run both parts, what environment variables are required, and documents every route used by the frontend and backend (including auth behavior and the password reset flow).

---

## Table of contents

- Project overview
- Prerequisites
- Environment variables
- Backend — setup & run
- Backend — available routes (full list)
- Frontend — setup & run
- Authentication & cookies
- Password reset flow
- Troubleshooting & tips

---

## Project overview

- Backend: TypeScript + Express + Mongoose. Handles users, JWT authentication (cookie), todos and password reset via email.
- Frontend: React + Vite (TypeScript). UI for signing up, logging in, creating/updating/deleting todos, and password reset.

The frontend expects to be served from http://localhost:5173 (Vite default). The backend listens on a port you configure (default in server code is 5000) — see notes on ports below.

---

## Prerequisites

- Node.js (v18+ recommended) and npm
- A running MongoDB instance (local or Atlas)
- An email account & credentials (Gmail or any SMTP) for password reset emails

---

## Environment variables

Create a `.env` file in the `backend/` folder with at least the following:

- MONGO_URI - MongoDB connection string
- JWT_SECRET_KEY - secret used to sign JWT tokens
- EMAIL_USER - email address used to send reset emails
- EMAIL_PASS - password or app-specific password for the email account
- PORT - (optional) backend HTTP port. The server defaults to 5000 if not set. The frontend uses port 4000 in the current code — see note below.
- COOKIE_DOMAIN - (optional) domain used when setting the cookie
- NODE_ENV - (optional) set to `production` when deploying

Example (backend/.env):

MONGO_URI=your_mongo_uri
JWT_SECRET_KEY=some_long_secret
EMAIL_USER=youremail@example.com
EMAIL_PASS=your_email_password
PORT=4000

Note: Many axios requests in the frontend currently target `http://localhost:4000`. If you prefer to keep the backend at its default port (5000), either update the frontend request URLs to the backend port you use or set `PORT=4000` in your backend `.env` so the ports match.

---

## Backend — setup & run

1. Open a terminal and go to the backend folder:
   - cd backend
2. Install dependencies:
   - npm install
3. Create `.env` (see variables above)
4. Start the dev server:
   - npm run dev

The server will log the address it's running on, e.g. `Server running on http://localhost:5000` (or your configured `PORT`).

Note: The backend enables CORS for `http://localhost:5173` and allows credentials, so cookies will be accepted from the Vite frontend.

---

## Backend — available routes

Base URL: http://localhost:<PORT>
(Replace `<PORT>` with the port you started the backend on; default in code is `5000`. Some frontend code expects `4000`.)

Routes are grouped by path prefixes.

- GET /
  - Purpose: simple health check. Returns `Server is running`.

- POST /user/signup
  - Purpose: register a new user
  - Payload (JSON): { username: string, email: string, password: string }
  - Response: 201 on success with `user` object and `token`. The server also sets an httpOnly cookie named `jwt`.

- POST /user/login
  - Purpose: authenticate an existing user
  - Payload (JSON): { email: string, password: string }
  - Response: 200 on success with `user` and `token`. Cookie `jwt` set.

- GET /user/logout
  - Purpose: clear authentication cookie
  - Response: 200 on success. Clears cookie `jwt`.

- POST /user/forgot-password
  - Purpose: start password reset. Generates a short-lived reset token stored on the user and sends an email with a link to the frontend (link points to `/reset-password/:token`).
  - Payload (JSON): { email: string }
  - Response: 200 if email was sent (or 404 if user not found).

- POST /user/reset-password
  - Purpose: complete password reset
  - Payload (JSON): { token: string, newPassword: string }
  - Response: 200 on success. Token must be unexpired and match the stored reset token.

Todo routes (all under `/todo`): these routes require authentication (middleware checks `jwt` cookie)

- POST /todo/create
  - Purpose: create a new todo for the logged-in user
  - Auth: required (cookie `jwt`)
  - Payload (JSON): { title: string, completed: boolean }
  - Response: 201 with created todo

- GET /todo/fetch
  - Purpose: get todos for the logged-in user
  - Auth: required
  - Response: 200 with `todos` array

- PUT /todo/update/:id
  - Purpose: update a todo by id
  - Auth: required
  - Payload (JSON): fields to update (example: { title: 'new', completed: true })
  - Response: 200 with updated todo

- DELETE /todo/delete/:id
  - Purpose: delete a todo
  - Auth: required
  - Response: 200 on success, or 404 if not found

Authentication details:
- The backend sets an httpOnly cookie named `jwt` when a user logs in or signs up. The frontend code also stores the token into `localStorage` from the response — but the server authorizes requests using the cookie. When making protected requests from the frontend, axios uses `withCredentials: true` to ensure cookies are sent.

---

## Frontend — setup & run

1. Open a terminal and go to the frontend folder:
   - cd frontend
2. Install dependencies:
   - npm install
3. Start the dev server:
   - npm run dev

By default Vite serves the app at `http://localhost:5173`.

Pages and routes (client-side):
- `/` — Home
- `/signup` — Sign up form
- `/login` — Login form
- `/forgot-password` — Request reset email (sends to backend `/user/forgot-password`)
- `/reset-password/:token` — Enter new password (submits to `/user/reset-password`)
- `/todo` — Protected todo page (requires login). The app stores a `jwt` token in `localStorage` and sends cookies via axios `withCredentials` for protected operations.

Notes about ports: the frontend code currently calls backend URLs like `http://localhost:4000`. If your backend runs on a different port (e.g. 5000), update the URLs in the frontend or set `PORT=4000` in the backend `.env` before starting.

---

## Password reset flow (detailed)

1. User goes to `/forgot-password` and enters their email.
2. Frontend posts to `POST /user/forgot-password` with `{ email }`.
3. Backend generates a reset token, stores it on the user with an expiry (1 hour), and emails a link to the frontend: `http://localhost:5173/reset-password/<token>`.
4. User clicks the link, which opens the frontend `ResetPassword` page (`/reset-password/:token`).
5. Frontend posts `{ token, newPassword }` to `POST /user/reset-password`.
6. Backend verifies token and expiry, updates the password, clears the token and expiry, and returns success.

---

## Troubleshooting & tips

- CORS / Cookies: backend has CORS configured to allow `http://localhost:5173` and `credentials: true`. Make sure front and back ports are correct and that `axios` calls from the frontend include `withCredentials: true` for routes that require receiving/sending cookies.

- Ports mismatch: frontend uses `http://localhost:4000` in many axios calls. If your backend is started on `5000`, you will need to either change frontend URLs to use `5000` or set `PORT=4000` in the backend `.env`

- Missing env variables: server will crash or fail to connect without `MONGO_URI` or `JWT_SECRET_KEY`. Check logs for clear messages printed by the server.

- Email errors: if using Gmail, you may need an App Password and to enable the proper settings for SMTP. Check the console logs from the backend for nodemailer errors.

- Database: if using MongoDB Atlas, whitelist your IP or allow access from anywhere (0.0.0.0/0) during development.

---

## Final notes

This README covers how to run both frontend and backend, the complete set of backend routes used by the frontend, and the authentication and password reset behaviors. If any of the ports or request URLs need adjusting, prefer updating the backend `PORT` in `backend/.env` or the frontend axios base-URLs to keep them consistent.

If you'd like, I can also add a small script or environment file templates to the repo to make running the app locally even easier.

---

Happy hacking!