const User = require('../models/User');
const Project = require('../models/Project');
const Donation = require('../models/Donation');

exports.getUsers = async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
};

exports.updateUser = async (req, res) => {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    res.json(user);
};

exports.deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
};

exports.getProjects = async (req, res) => {
    const projects = await Project.find().populate('creator', 'username email');
    res.json(projects);
};

exports.updateProject = async (req, res) => {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
};

exports.deleteProject = async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
};

exports.getDonations = async (req, res) => {
    const donations = await Donation.find().populate('donor', 'username email');
    res.json(donations);
};

exports.getStats = async (req, res) => {
    const totalUsers = await User.countDocuments();
    const totalProjects = await Project.countDocuments();
    const totalDonations = await Donation.countDocuments();

    res.json({ totalUsers, totalProjects, totalDonations });
};
