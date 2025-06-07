### Practical 2
---
This practical demonstrates how to design and implement a RESTful API for a TikTok-like application using Node.js and Express. The API includes endpoints for videos, users, and comments with full CRUD operations and social interactions.

### Features
**Core Resources**
- Videos:

    - Create, read, update, and delete videos

    - Like/unlike functionality

    - Comment management

- Users:

    - User profiles and authentication

    - Follow/unfollow system

    - User video collections

- Comments:

    - Comment on videos

    - Like/unlike comments

### Technical Implementation
- RESTful endpoint design

- In-memory data store (can be replaced with database)

- Proper HTTP status codes

- Input validation

- Comprehensive error handling

### Installation
1. Create project directory:
```
mkdir server
cd server
```
2. Initialize Node.js project:
```
npm init -y
```
3. Install dependencies:
```
npm install express cors morgan body-parser dotenv
npm install nodemon --save-dev
```
4. Set up environment variables:
```
echo "PORT=3000" > .env
echo "NODE_ENV=development" >> .env
```
5. Start development server:
```
npm run dev
```
### Project Structure
```
server/
├── src/
│   ├── controllers/
│   │   ├── videoController.js
│   │   ├── userController.js
│   │   └── commentController.js
│   ├── routes/
│   │   ├── videos.js
│   │   ├── users.js
│   │   └── comments.js
│   ├── models/
│   │   └── index.js (mock data)
│   ├── middleware/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── .env
└── package.json
```
### API Endpoints
**Videos**
```
Method  | 	Endpoint                   |	Description
GET     |	/api/videos                |	Get all videos
POST    |	/api/videos                |	Create new video
GET     |	/api/videos/:id            |	Get specific video
PUT     |	/api/videos/:id            |	Update video
DELETE  |	/api/videos/:id            |	Delete video
GET     |	/api/videos/:id/comments   | 	Get video comments
GET     | 	/api/videos/:id/likes      |	Get video likes
POST    |	/api/videos/:id/likes      |	Like a video
DELETE  |	/api/videos/:id/likes      |	Unlike a video
```
**Users**
```
Method  |	Endpoint                   |	Description
GET     |	/api/users                 |	Get all users
POST    |	/api/users                 |	Create new user
GET     |	/api/users/:id             |	Get specific user
PUT     |	/api/users/:id             |	Update user
DELETE  |	/api/users/:id             |	Delete user
GET     |	/api/users/:id/videos      |	Get user's videos
GET     |	/api/users/:id/followers   |	Get user's followers
POST    | 	/api/users/:id/followers   |	Follow a user
DELETE  |	/api/users/:id/followers   |	Unfollow a user
```
### Testing the API
1. Get all videos:
```
curl -X GET http://localhost:3000/api/videos
```
2. Create a video:
```
curl -X POST http://localhost:3000/api/videos \
  -H "Content-Type: application/json" \
  -d '{"title":"My Video","url":"video.mp4","userId":1}'
```
3. Follow a user:
```
curl -X POST http://localhost:3000/api/users/2/followers \
  -H "Content-Type: application/json" \
  -d '{"followerId":1}'
```
### Development Scripts
- npm run dev: Start development server with nodemon

- npm start: Start production server

### Next Steps
1. Connect to a real database (MongoDB, PostgreSQL)

2. Implement JWT authentication

3. Add file upload for videos

4. Implement pagination for large datasets