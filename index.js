const express = require('express');
const { connectToDatabase } = require('./db');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

// Routes
const todoRoutes = require('./routes/TodoRoute');
const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

app.listen(port, () => { 
    console.log(`Server is running on http://localhost:${port}`);
});

connectToDatabase();