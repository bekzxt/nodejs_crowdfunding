const express = require('express');
const isAdmin  = require('../middleware/adminMiddleware');
const { getUsers, updateUser, deleteUser, getProjects, updateProject, deleteProject, getDonations, getStats } = require('../controllers/adminController');
const router = express.Router();


router.get('/users', isAdmin, getUsers);
router.put('/users/:id', isAdmin, updateUser);
router.delete('/users/:id', isAdmin, deleteUser);

router.get('/projects', isAdmin, getProjects);
router.put('/projects/:id', isAdmin, updateProject);
router.delete('/projects/:id', isAdmin, deleteProject);

router.get('/donations', isAdmin, getDonations);
router.get('/stats', isAdmin, getStats);

module.exports = router;
