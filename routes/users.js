const express = require('express');
const router = express.Router();

// Define routes for /api/users
router.get('/', (req, res) => {
    // return a list of all users
    res.json([{
            id: 1,
            name: 'John'
        },
        {
            id: 2,
            name: 'Jane'
        },
        {
            id: 3,
            name: 'Bob'
        },
    ]);
});

router.post('/', (req, res) => {
    // create a new user and return its ID
    const newUser = req.body;
    newUser.id = 4; // hard-coded for simplicity
    res.json(newUser);
});

router.get('/:id', (req, res) => {
    // return the user with the specified ID
    const id = parseInt(req.params.id);
    if (id === 1) {
        res.json({
            id: 1,
            name: 'John'
        });
    } else if (id === 2) {
        res.json({
            id: 2,
            name: 'Jane'
        });
    } else if (id === 3) {
        res.json({
            id: 3,
            name: 'Bob'
        });
    } else {
        res.status(404).json({
            message: 'User not found'
        });
    }
});

router.put('/:id', (req, res) => {
    // update the user with the specified ID
    const id = parseInt(req.params.id);
    if (id === 1 || id === 2 || id === 3) {
        const updatedUser = req.body;
        updatedUser.id = id;
        res.json(updatedUser);
    } else {
        res.status(404).json({
            message: 'User not found'
        });
    }
});

router.delete('/:id', (req, res) => {
    // delete the user with the specified ID
    const id = parseInt(req.params.id);
    if (id === 1 || id === 2 || id === 3) {
        res.status(204).send();
    } else {
        res.status(404).json({
            message: 'User not found'
        });
    }
});

module.exports = router;