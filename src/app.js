const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const studentRoutes = require('./routes/studentRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// TEMP: Login bypass to get a token
app.post('/api/v1/auth/test-login', (req, res) => {
    // Simulating a Registrar user login
    const token = jwt.sign(
        { id: 1, name: 'Admin_Registrar', role: 'registrar' }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
    );
    res.json({ token });
});

app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/admin', adminRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

module.exports = app;