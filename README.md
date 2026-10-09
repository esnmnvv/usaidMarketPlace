# Eatasty

Eatasty has a Spring Boot API and a React frontend. The frontend
includes registration, login, a protected profile page, and logout. Authentication
uses a server session stored in a browser cookie.

## Run locally

Requirements: JDK 21, Node.js 20.19+ (or 22.12+), and npm. Docker is optional.

Run `EatTastyApplication` in IntelliJ IDEA, or start Spring Boot from the
repository root:

```bash
sh mvnw spring-boot:run
```

The default database is a local H2 file, `eattasty-data.mv.db`, created in the
project directory. It keeps registered users between restarts, needs no password
or database server, and is ignored by Git.

In another terminal, start React:

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

### Optional PostgreSQL

To use PostgreSQL instead of the local H2 file, start the database and enable
the `postgres` Spring profile:

```bash
docker compose up -d db
SPRING_PROFILES_ACTIVE=postgres sh mvnw spring-boot:run
```

In IntelliJ IDEA, set the active profile to `postgres` in the Spring Boot run
configuration after starting Docker Compose. PostgreSQL uses local port 55432,
so it does not interfere with a server already using port 5432. The development
credentials in `compose.yaml` match `application-postgres.yaml`.

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

The database password in `compose.yaml` is for development. For deployment,
set production database credentials through environment variables, serve the
frontend and API on the same origin (or explicitly
configure CORS and cookie policy), and review the application's security
settings. A standalone frontend build is created with `cd frontend && npm run
build` in `frontend/dist`.

In the Codex cloud environment, see `/workspace/eatasty-runtime/README.md` for
the prepared JDK, database, and API commands. The cloud environment uses a
separate development database on port 55432 and does not provide a browser
preview for loopback addresses.
