const express = require('express');
const { createProject, getProjects,updateProject, deleteProject, getProjectById } = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', authMiddleware, updateProject);
router.delete('/:id', authMiddleware, deleteProject);
module.exports = router;

