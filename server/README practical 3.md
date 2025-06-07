### Practical 3
---
This practical demonstrates how to implement a secure file upload system with Node.js/Express backend and React/Next.js frontend. The system includes file validation, progress tracking, and proper error handling for a complete upload solution.

### Features
**Backend Implementation**
- Multer middleware for handling multipart form data

- File validation (type and size restrictions)

- Secure storage with unique filenames

- CORS configuration for frontend connectivity

- Error handling for various upload scenarios

**Frontend Integration**
- Drag-and-drop file upload interface

- Real-time upload progress tracking

- File preview for images

- Proper error display and user feedback

### Installation
**Backend Setup**
1. Create project directory:
```
mkdir file-upload-server
cd file-upload-server
```
2. Initialize Node.js project:
```
npm init -y
```
3. Install dependencies:
```
npm install express cors multer morgan dotenv
```
4. Create .env file:
```
env
PORT=8000
FRONTEND_URL=http://localhost:3000
```
5. Start server:
```
node server.js
```
**Frontend Setup**
1. Update your Next.js upload component to point to the Express backend:
```
javascript

const response = await axios.post('http://localhost:8000/api/upload', formData, {
  onUploadProgress: (progressEvent) => {
    const percentage = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setUploadProgress(percentage);
  }
});
```
### Project Structure
```
file-upload-server/
├── server.js           # Main server file
├── uploads/            # File storage directory
├── .env                # Environment variables
└── package.json

frontend/
├── pages/
│   └── upload.js       # Updated upload component
```
### Key Configuration
**Multer Setup (Backend)**
```
javascript

const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});
```

**CORS Configuration**
```
javascript

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
```
### Testing the Implementation
1. Valid Upload:
- Select an image or PDF file (<5MB)

- Verify progress tracking works

- Check file appears in uploads/ directory

2. Invalid File Type:

- Attempt to upload unsupported file type

- Verify proper error message appears

3. Large File:

- Attempt to upload file >5MB

- Verify size limit error appears

### Key Concepts
1. Multipart Form Data: Special format for sending files + form data

2. File Validation: Critical for security and system integrity

3. Progress Tracking: Essential UX for large file uploads

4. CORS: Required for frontend-backend communication across origins

