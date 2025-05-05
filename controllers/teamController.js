const { Team, User } = require('../models');

// Create a team, and add creator as member
const createTeam = async (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required.' });
  try {
    const team = await Team.create({ name, description });
    await team.addUser(req.user);          // add creator
    res.status(201).json(team);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Join an existing team by ID
const joinTeam = async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (!team) return res.status(404).json({ message: 'Team not found' });
    await team.addUser(req.user);
    res.json({ message: `Joined team ${team.name}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// List all teams the user belongs to
const listMyTeams = async (req, res) => {
  try {
    const teams = await req.user.getTeams();
    res.json(teams);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createTeam, joinTeam, listMyTeams };
