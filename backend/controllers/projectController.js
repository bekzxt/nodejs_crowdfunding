const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    try {
        const { title, description, goal } = req.body;
        const project = new Project({ title, description, goal, creator: req.user.userId });
        await project.save();
        res.status(201).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getProjects = async (req, res) => {
    const projects = await Project.find().populate('creator', 'username email');
    res.json(projects);
};

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('creator', 'username email');
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (error) {
        res.status(400).json({ error: 'Invalid project ID' });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, goal } = req.body;

        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (project.creator.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        project.title = title || project.title;
        project.description = description || project.description;
        project.goal = goal || project.goal;

        await project.save();
        res.json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        const project = await Project.findById(id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        if (project.creator.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await project.deleteOne();
        res.json({ message: 'Project deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};