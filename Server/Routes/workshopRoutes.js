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



///____________________

// to add this to the router
// router.get('/', (req, res) => {
//     res.send('All classes!')
// })
// router.post('/', (req, res) => {
//     res.send('Creating a new class or workshop!')
// })
// router.get('/:id', (req, res) => {
//     res.send('Viewing a specific class or workshop!')
// })
// router.get('/:id/edit', (req, res) => {
//     res.send('Editing a class or workshop!')
// })

// router.delete('/:id', (req, res) => {
//     res.send('Deleting a workshop!')
// })

module.exports = router;

// const makeWorkshop = async () => {
//     const newWorkshop = new Workshop({
//         workshopName: 'Handbuilding 101',
//         instructor: 'Fred Flintstone',
//         price: 200,
//         dateAndTime: 'Every Monday,1 Sept - 29th Sept, 6pm-9pm',
//         location: ' Ceramics Studio Co-Op, 22 Bedrock lane, Bedrock.',
//         image: {
//             url: 'https://plus.unsplash.com/premium_photo-1677456380022-ee60eba4ebd7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//             filename: 'welcome!'
//         }
//     })
//     const res = await newWorkshop.save()
//     console.log(res)
// }
// makeWorkshop();