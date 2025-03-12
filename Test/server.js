const http =  require("http");

const server = http.createServer((req,res) => {
    console.log(`Recived request: ${req.method} ${req.url}`);

    res.writehead(200, { "Content-Type": "test/plain"});
    res.end("Welcome to the server.");
});

// Define the port number
const PORT = 3000;

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});





