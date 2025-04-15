const { Pool } = require('pg');

// Create a connection pool - ADJUST YOUR CREDENTIALS AS NEEDED
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'student_records',
    password: '1234',  // Add your password here
    port: 5432
});

// Test the connection and run a query
async function testConnection() {
    let client;

    try {
        // Get a client from the pool
        client = await pool.connect();
        console.log('Connected to PostgreSQL database!');

        // Run a simple query
        const result = await client.query('SELECT * FROM students');

        // Print the results
        console.log('Students in database:');
        console.table(result.rows);  // ✅ Fixed logging issue

        // Count rows
        console.log(`Total students: ${result.rowCount}`);
    } catch (err) {
        console.error('Database connection error:', err);
    } finally {
        // Release the client back to the pool
        if (client) client.release();
    }
}

// Run the test
testConnection();
