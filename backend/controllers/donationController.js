const Donation = require('../models/Donation');
const Project = require('../models/Project');

exports.donate = async (req, res) => {
    try {
        const { amount, projectId } = req.body;
        if (amount <= 0) return res.status(400).json({ message: 'Invalid donation amount' });

        const project = await Project.findById(projectId);
        if (!project) return res.status(404).json({ message: 'Project not found' });

        const donation = new Donation({ amount, donor: req.user.userId, project: projectId });
        await donation.save ();

        project.raised += amount;
        await project.save();

        res.status(201).json({ message: 'Donation successful', donation });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getDonations = async (req, res) => {
    try {
        const donations = await Donation.find().populate('donor', 'username email').populate('project', 'title');
        res.json(donations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
