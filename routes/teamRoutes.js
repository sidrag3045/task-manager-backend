const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { createTeam, joinTeam, listMyTeams } = require('../controllers/teamController');

router.use(auth);

router.post('/', createTeam);      
router.post('/:id/join', joinTeam);    
router.get('/', listMyTeams);    

module.exports = router;
