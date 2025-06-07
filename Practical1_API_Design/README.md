### Practical 1
---
This practical demonstrates how to design and implement a RESTful API for a social media platform using Node.js and Express. The API includes endpoints for users, posts, comments, likes, and followers with proper HTTP methods, status codes, and content negotiation.

### Features
**Core Resources**
- Users: CRUD operations with pagination

- Posts: Create, read, update, and delete posts

- Comments: Post comments functionality

- Likes: Like/unlike posts

- Followers: User following system

**Technical Implementation**
- RESTful endpoint design

- JWT authentication (simulated) 

- Content negotiation (JSON/XML)

- Pagination and filtering

- Error handling middleware

- API documentation

### Installation
1. Create project directory:
```
mkdir social-media-api
cd social-media-api
```
2. Initialize Node.js project:
```
npm init -y
```
3. Install dependencies:
```
npm install express morgan cors helmet dotenv
npm install nodemon --save-dev
```
4. Set up environment variables:
```
echo "PORT=3000" > .env
```
5. Start development server:
```
npm run dev
```
### Project Structure
```
src/
├── controllers/
│   ├── userController.js
│   ├── postController.js
│   └── (other resources)
├── routes/
│   ├── users.js
│   ├── posts.js
│   └── (other resources)
├── middleware/
│   ├── errorHandler.js
│   ├── formatResponse.js
│   └── async.js
├── utils/
│   ├── mockData.js
│   └── errorResponse.js
├── public/
│   └── docs.html
└── server.js
```
### API Endpoints
**Users**
```
Method  |	Endpoint	    |   Description
GET	    |   /api/users	    |   Get paginated list of users
GET	    |   /api/users/:id	|   Get specific user
POST	|   /api/users	    |   Create new user
PUT	    |   /api/users/:id	|   Update user
DELETE	|   /api/users/:id	|   Delete user
```
**Posts**
```
Method  |	Endpoint	    |   Description
GET     |	/api/posts	    |   Get paginated list of posts
GET	    |   /api/posts/:id	|   Get specific post
POST	|   /api/posts	    |   Create new post
PUT	    |   /api/posts/:id	|   Update post
DELETE	|   /api/posts/:id	|   Delete post
```
### Key Concepts
1. RESTful Design Principles
- Resource-based endpoints

- Proper HTTP methods and status codes

- Consistent response formats

- Stateless operations

2. Middleware
- Error handling

- Response formatting (JSON/XML)

- Async/await error handling

- Security headers

3. Content Negotiation
- Supports both JSON and XML responses

- Automatic format detection via Accept header

- Consistent data structure across formats

### Testing the API
1. List Users:
```
curl http://localhost:3000/api/users
```
2. Create Post:
```
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -H "X-User-Id: 1" \
  -d '{"caption":"Test post","image":"test.jpg"}'
```
3. Get XML Response:
```
curl -H "Accept: application/xml" http://localhost:3000/api/users
```