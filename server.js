require('dotenv').config();
const express = require('express');
const app = express();

// Parsing JSON bodies
app.use(express.json());

// Mount routers (we’ll fill these in soon)
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Health-check endpoint
app.get('/', (req, res) => res.send('✅ API up and running'));

// Sequelize DB connection & sync
const { sequelize } = require('./models');
(async () => {
  try {
    await sequelize.authenticate();
    console.log('✔️  Database connected');
    await sequelize.sync({ alter: true });
    console.log('🔄  Models synchronized');
  } catch (err) {
    console.error('❌  DB connection/sync failed:', err);
  }
})();

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
