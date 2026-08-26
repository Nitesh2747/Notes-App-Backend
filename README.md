# Notes App — Backend

REST API for the [Notes App](https://github.com/Nitesh2747/Notes-App) frontend. Handles user authentication and per-user note storage in MongoDB, with optional public sharing.

**Live API:** [notes-app-backend-6y6q.onrender.com](https://notes-app-backend-6y6q.onrender.com/)
**Frontend repo:** [Notes App](https://github.com/Nitesh2747/Notes-App)

## Features

- Signup/login with bcrypt-hashed passwords and JWT-based auth
- Full CRUD for notes, all scoped to the authenticated user
- Opt-in public sharing — a note can be flagged shareable and viewed via a public, unauthenticated endpoint
- CORS-enabled for use with a separately hosted frontend

## Tech stack

- Node.js / Express
- MongoDB Atlas + Mongoose
- jsonwebtoken (JWT)
- bcrypt
- dotenv, cors

## Getting started locally

### Prerequisites
- Node.js (v18+ recommended)
- A MongoDB connection string (local via MongoDB Compass, or a MongoDB Atlas cluster)

### Setup

```bash
git clone https://github.com/Nitesh2747/Notes-App-Backend.git
cd Notes-App-Backend
npm install
```

Create a `.env` file in the project root:

```
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=a-long-random-secret-string
```

Run the dev server (auto-restarts on changes via nodemon):

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

## API reference

All endpoints are prefixed with `/api`.

### Auth — `/api/auth`

| Method | Endpoint    | Description                      | Auth required  |
|--------|-------------|----------------------------------|:--------------:|
| POST   | `/signup`   | Create an account, returns a JWT | No             |
| POST   | `/login`    | Log in, returns a JWT            | No             |

### Notes — `/api/pastes`

| Method | Endpoint              | Description                                       | Auth required  |
|--------|-----------------------|---------------------------------------------------|:--------------:|
| GET    | `/`                   | Get all notes for the logged-in user              | Yes            |
| POST   | `/`                   | Create a note                                     | Yes            |
| PUT    | `/:id`                | Update a note (title, content, and/or `isPublic`) | Yes            |
| DELETE | `/:id`                | Delete a note                                     | Yes            |
| GET    | `/public/:id`         | Get a note if it's marked public                  | No             |

Authenticated requests must include an `Authorization: Bearer <token>` header, using the token returned from signup/login.

## Deployment

Deployed on [Render](https://render.com) as a standard always-on web service.

**Build command:** `npm install`
**Start command:** `npm start`

**Environment variables required on the host:**
- `MONGO_URI`
- `JWT_SECRET`

MongoDB Atlas Network Access must allow connections from anywhere (`0.0.0.0/0`), since Render doesn't provide a static outbound IP.

## Project structure

```
├── config/
│   └── db.js              # Mongoose connection
├── models/
│   ├── UserModel.js
│   └── PasteModel.js
├── middleware/
│   └── auth.js             # JWT verification
├── controllers/
│   ├── authController.js
│   └── pasteController.js
├── routes/
│   ├── authRoutes.js
│   └── pasteRoutes.js
└── server.js
```

## License

MIT
