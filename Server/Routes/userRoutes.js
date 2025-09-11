const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('All artists!')
})
router.post('/', (req, res) => {
    res.send('Creating a new artist page!')
})
router.get('/:id', (req, res) => {
    res.send('Viewing a specific artist')
})
router.get('/:id/edit', (req, res) => {
    res.send('Editing an artist page')
})

module.exports = router;

// const makeUser = async () => {
//     const u = new User({
//         firstName: 'Daphna',
//         lastName: 'Azari',
//         userName: 'DaphnaA',
//         email: 'daphna.azari@gmail.com',
//         password: 'ceramicsTime123!'
//     })
//     const res = await u.save()
//     console.log(res)
// }
// makeUser();