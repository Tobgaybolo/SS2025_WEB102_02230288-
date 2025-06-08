Practical 6
---
This practical demonstrates how to implement token-based authentication (email & password) using JWT with Hono, Prisma, and PostgreSQL. The solution provides secure user registration, login, and protected API endpoints.

### Key Features
**Authentication System**
- User registration with password hashing

- Secure login with JWT token generation

- Password hashing using bcrypt

- JWT token verification middleware

**Authorization**
- Protected routes requiring valid JWT

- Role-based access control (future implementation)

- Token expiration handling

**Database Integration**
- Prisma ORM for PostgreSQL

- Secure password storage

- User-account relationships

### Installation
1. Clone the repository:
```
git clone https://github.com/rubcstswe/web102-hono-auth-jwt-prisma-forked.git
cd web102-hono-auth-jwt-prisma-forked
```
2. Install dependencies:
```
bun install
```
3. Set up database:
```
bunx prisma db push
bunx prisma generate
```
### Project Structure
```
src/
├── index.ts            # Main application file
prisma/
├── schema.prisma       # Database schema
.env                   # Environment variables
```
### API Endpoints
**Public Routes**
```
Method  |	Endpoint   |	Description
POST    |	/register  |	Register new user
POST    |	/login     |	Authenticate user
```
**Protected Routes**
```
Method  |	Endpoint                   |	Description
GET     |	/protected/account/balance |	Get user account balance
```
### Implementation Details
1. User Registration
```
typescript

app.post("/register", async (c) => {
  const body = await c.req.json();
  const hashedPassword = await Bun.password.hash(body.password, {
    algorithm: "bcrypt",
    cost: 4,
  });

  const user = await prisma.user.create({
    data: {
      email: body.email,
      hashedPassword,
      Account: { create: { balance: 0 } }
    }
  });

  return c.json({ message: `${user.email} created successfully` });
});
```

2. User Login
```
typescript

app.post("/login", async (c) => {
  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where: { email: body.email },
    select: { id: true, hashedPassword: true }
  });

  if (!user) throw new HTTPException(401, { message: "Invalid credentials" });

  const match = await Bun.password.verify(
    body.password,
    user.hashedPassword,
    "bcrypt"
  );

  if (!match) throw new HTTPException(401, { message: "Invalid credentials" });

  const token = await sign(
    { sub: user.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
    "mySecretKey"
  );

  return c.json({ message: "Login successful", token });
});
```
3. Protected Route
```
typescript

app.use("/protected/*", jwt({ secret: "mySecretKey" }));

app.get("/protected/account/balance", async (c) => {
  const payload = c.get('jwtPayload');
  const user = await prisma.user.findUnique({
    where: { id: payload.sub },
    select: { Account: { select: { balance: true, id: true } } }
  });
  return c.json({ data: user });
});
```
### Testing the API
1. Register a User
```
curl -X POST http://localhost:3000/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"securepassword"}'
```
2. Login
```
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"securepassword"}'
```
3. Access Protected Route
```
curl -X GET http://localhost:3000/protected/account/balance \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```
### Security Notes
- Secret Key: Always store JWT secret in environment variables

- Password Hashing: Never store plain text passwords

- HTTPS: Always use HTTPS in production

- Token Expiration: Set reasonable token expiration times

