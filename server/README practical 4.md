### Practical 4
---
This practical demonstrates how to connect a TikTok-like application to a PostgreSQL database using Prisma ORM. The implementation includes database setup, schema migration, authentication, and updating RESTful API endpoints to use persistent storage.

### Features
**Database Integration**
- PostgreSQL database configuration

- Prisma ORM setup and schema definition

- Database migrations

- Type-safe database operations

**Authentication System**
- JWT token-based authentication

- Password hashing with bcrypt

- Protected routes middleware

- User session management

**API Enhancements**
- Persistent data storage for all resources

- Complex queries with relationships

- Transactions for data consistency

- Test data seeding

### Installation
1. Database Setup
```
sudo -u postgres psql
CREATE DATABASE tiktok_db;
CREATE USER tiktok_user WITH ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE tiktok_db TO tiktok_user;
```
2. Project Setup
```
cd server
npm install @prisma/client prisma bcrypt jsonwebtoken
npx prisma init
```
3. Configuration
Add to .env:
```
env
DATABASE_URL="postgresql://tiktok_user:your_password@localhost:5432/tiktok_db?schema=public"
JWT_SECRET=yourverylongandsecurerandomsecret
JWT_EXPIRE=30d
```
### Project Structure
```
server/
├── prisma/
│   ├── schema.prisma    # Data model definition
│   └── migrations/      # Database migration files
├── src/
│   ├── controllers/     # Updated controllers
│   ├── middleware/      # Auth middleware
│   ├── lib/
│   │   └── prisma.js    # Prisma client instance
│   └── index.js         # Server entry point
└── .env                 # Environment variables
```
###Key Implementation Steps
1. Prisma Schema Definition
Define your data models in prisma/schema.prisma:
```
prisma

model User {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  email     String   @unique
  password  String
  videos    Video[]
  comments  Comment[]
  // ... other fields
}
```
2. Run Migrations
```
npx prisma migrate dev --name init
```
3. Authentication Middleware
- Create src/middleware/auth.js with JWT verification logic to protect routes.
4. Update Controllers
Modify controllers to use Prisma Client for database operations:
```
javascript

// Example user controller method
exports.getUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) },
    include: { videos: true }
  });
  res.json(user);
};
```
5. Seed Test Data
Add seed script to package.json:
```
json
"scripts": {
  "seed": "node prisma/seed.js"
}
```
- Run with:
```
npm run seed
```
### Testing the Implementation
1. Start the server:
```
npm run dev
```
2. Test endpoints:

- Register new user (POST /api/users)

- Login (POST /api/auth/login)

- Access protected routes with JWT token

4. Verify database:

- Check tables in PostgreSQL

- Confirm relationships are properly maintained

### Key Concepts
1. Prisma ORM:

- Type-safe database access

- Automatic query generation

- Schema migrations

2. Authentication:

- Password hashing

- JWT token generation/verification

- Route protection middleware

3. Database Design:

- Table relationships (1:1, 1:many, many:many)

- Indexes for performance

- Data validation at schema level

