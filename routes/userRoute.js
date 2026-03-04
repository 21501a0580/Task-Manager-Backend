const express = require('express');
const protect = require('../middleware/authMiddleware');
const User = require('../models/user');
const router = express.Router();

// GET /api/users/:id
// Inline async handler (replaces controller import) so the route directly
// fetches the user by id and returns JSON. Errors are forwarded to next().
router.get('/:id', protect, async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		res.json(user);
		console.log('User fetched from server and sent to client:', user);
	} catch (error) {
		next(error);
	}
});

module.exports = router;