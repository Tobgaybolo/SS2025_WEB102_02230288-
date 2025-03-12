const http = require('http');

const students = [
    { id: 1, name: "Kinley", age: 22 },
    { id: 2, name: "Sonam", age: 24 },
    { id: 3, name: "Tashi", age: 25 }
];

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to our API');
    }

    else if (req.method === 'GET' && req.url === '/students') {
        res.writeHead(200);
        res.end(JSON.stringify(students));
    }

    // ✅ Handle GET request for /students/:id
    else if (req.method === 'GET' && req.url.startsWith('/students/')) {
        // Extract the ID from the URL
        const id = parseInt(req.url.split('/')[2]); // "/students/2" -> id = 2

        // Find the student
        const student = students.find(s => s.id === id);

        if (student) {
            res.writeHead(200);
            res.end(JSON.stringify(student));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ error: "Student not found" }));
        }
    }

    else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Route not found" }));
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
