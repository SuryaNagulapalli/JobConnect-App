require('dotenv').config();
const express = require('express');
const pg = require('pg');
const cors = require('cors');
const { Pool } = pg;

const app = express();

app.use(express.json());

app.use(cors({
    origin: "whimsical-cactus-7e4b08.netlify.app",
    credentials: true
}));

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});

app.get('/alljobs', async (request, response) => {
    try {
        const allJobsQuery = `SELECT * FROM jobs`;
        const result = await pool.query(allJobsQuery);
        response.json(result.rows);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        response.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/post-jobs", async (request, response) => {
    try {
        const jobDetails = request.body;
        const { title, company, location, salary, description } = jobDetails;

        if (!title || !company || !location || !description) {
            return response.status(400).json({ error: "Missing required fields" });
        }

        const salaryValue = salary ? parseInt(salary) : null;

        const postJobQuery = `
            INSERT INTO jobs (Title, Company, Location, Salary, Description)
            VALUES($1, $2, $3, $4, $5)
            RETURNING *
        `;
        
        const result = await pool.query(postJobQuery, [
            title,
            company,
            location,
            salaryValue,
            description
        ]);
        
        response.json({ 
            message: "Job Posted Successfully"
        });
    } catch (error) {
        console.error("Error posting job:", error);
        response.status(500).json({ error: "Internal server error" });
    }
});

pool.connect((err) => {
    if (err) {
        console.log("Error connecting to database:", err.message);
    } else {
        console.log("Connected to database");
    }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`);
});
