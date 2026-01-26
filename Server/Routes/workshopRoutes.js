const express = require('express');
// to create a new router object:
const router = express.Router();
//NEW to import my model:
const Workshop = require('../Models/Workshop');




//NEW updated routes:
router.get('/', async (req, res) => {
    try {
        const workshops = await Workshop.find(); //fetch
        res.json(workshops); // send data to frontend
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newWorkshop = new Workshop(req.body);
        const savedWorkshop = await newWorkshop.save();
        res.status(201).json(savedWorkshop);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const workshop = await Workshop.findById(req.params.id);
        if (!workshop) return res.status(404).json({ message: 'Workshop not found' });
        res.json(workshop);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;