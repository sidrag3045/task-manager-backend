require('dotenv').config();
const express = require('express');
const app = express();

// Parsing JSON bodies
app.use(express.json());

// Mount routers on the app
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const teamRoutes = require('./routes/teamRoutes');
const commentRoutes = require('./routes/commentRoutes');
const attachmentRoutes = require('./routes/attachmentRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/tasks/:taskId/comments', commentRoutes);
app.use('/api/tasks/:taskId/attachments', attachmentRoutes);

// Serve uploaded files statically
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Health-check endpoint
app.get('/', (req, res) => res.send('API up and running'));

// Sequelize DB connection & sync
const { sequelize } = require('./models');
// Using IIFE notation to handle async DB connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    await sequelize.sync({ alter: true });
    console.log('Models synchronized');
  } catch (err) {
    console.error('DB connection/sync failed:', err);
  }
})();
// we can also do the above using promise chaining and async/await but without iife notation

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
