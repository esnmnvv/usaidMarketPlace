# Eatasty

Eatasty has a Spring Boot API, a React frontend, and PostgreSQL. The frontend
includes registration, login, a protected profile page, and logout. Authentication
uses a server session stored in a browser cookie.

## Run locally

Requirements: JDK 21, Node.js 20.19+ (or 22.12+), npm, and Docker with Compose.

From the repository root, start PostgreSQL:

```bash
docker compose up -d db
```

In a second terminal, start Spring Boot. The included `application.yaml` matches
the development database in `compose.yaml`:

```bash
sh mvnw spring-boot:run
```

In a third terminal, start React:

```bash
cd frontend
npm ci
npm run dev
```

Open the address printed by Vite (normally `http://127.0.0.1:5173`). Create an
account, then view your profile. Registration signs you in automatically.
Vite forwards `/api` requests to Spring Boot at port 8080, so cookie sessions
work without cross-origin requests during local development. Keep both servers
running while using the frontend.

## Checks

```bash
sh mvnw verify
cd frontend && npm ci && npm run build
```

The browser routes are `/`, `/register`, `/login`, and `/profile`. The API
routes are `POST /api/auth/register`, `POST /api/auth/login`,
`GET /api/auth/me`, and `POST /api/auth/logout`. The profile requires login.
React sends cookies with Axios requests; a `sessionId` field in the login
response is informational and is not a JWT.

## Frontend structure

The React app follows Feature-Sliced Design. `frontend/src/app` contains the
providers, router and global styles; `pages` assembles the screens; `widgets`
contains the header, footer and authentication layout; `features/auth` contains
the registration, login and logout actions; `entities/session` owns the current
user and session state; and `shared` contains the API client and reusable fields.
Slices expose their entry points through `index.js`. Dependencies point down
the layers, so shared code does not import features or pages.

The database password and local port in `compose.yaml` are for development.
For deployment, set production database credentials through environment
variables, serve the frontend and API on the same origin (or explicitly
configure CORS and cookie policy), and review the application's security
settings. A standalone frontend build is created with `cd frontend && npm run
build` in `frontend/dist`.

In the Codex cloud environment, see `/workspace/eatasty-runtime/README.md` for
the prepared JDK, database, and API commands. The cloud environment uses a
separate development database on port 55432 and does not provide a browser
preview for loopback addresses.
