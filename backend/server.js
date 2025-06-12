require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/clients', require('./routes/clients'));
app.use('/api/guards', require('./routes/guards'));
app.use('/api/incidents', require('./routes/incidents'));
app.use('/api/audits', require('./routes/audits'));
app.use('/api/training', require('./routes/training'));

// Placeholder for routes
// Example: app.use('/api/clients', require('./routes/clients'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Models
const Incident = require('./models/Incident');
const Guard = require('./models/Guard');
const Audit = require('./models/Audit');
const Alert = require('./models/Alert');

// Statistics Routes
app.get('/api/incidents', authenticateToken, async (req, res) => {
  try {
    const incidents = await Incident.find();
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching incidents', error: error.message });
  }
});

app.get('/api/guards', authenticateToken, async (req, res) => {
  try {
    const guards = await Guard.find();
    res.json(guards);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching guards', error: error.message });
  }
});

app.get('/api/audits', authenticateToken, async (req, res) => {
  try {
    const audits = await Audit.find();
    res.json(audits);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching audits', error: error.message });
  }
});

app.get('/api/alerts', authenticateToken, async (req, res) => {
  try {
    const alerts = await Alert.find();
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching alerts', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
