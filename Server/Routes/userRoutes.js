const express = require('express');
const router = express.Router();
const { makeUser, getUserById, updateUser } = require('../controllers/userC')

router.get('/', (req, res) => {
    console.log('params', req.params);
    res.send('All artists!')
})
// router.post('/', (req, res) => {
//     console.log('req.body :', req.body)
//     res.send('Creating a new artist page!')

// })

// POST: Create user
router.post('/', makeUser);
console.log("Creating a new artist page!")

//** */
// PUT: Edit user profile
// GET: View user profile
router.get('/:id', getUserById);

// PUT: Edit user profile
router.put('/:id', updateUser)

// DELETE: Delete user

router.delete('/:id', (req, res) => {
    res.send('Deleting an artist page');
});


// router.get('/:id', (req, res) => {
//     console.log('params', req.params);
//     res.send(`Viewing artist with ID: ${req.params.id}`);
// });

// router.get('/:id/edit', (req, res) => {
//     res.send('Editing an artist page')
// })

// router.delete('/:id', (req, res) => {
//     res.send('Deleting an artist page')
// })

module.exports = router;

// to delete later
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