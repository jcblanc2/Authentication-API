const router = require('express').Router();

// Routes
router.post('/register', (req, res) => {
    res.send('register');
});

router.post('/login', (req, res) => {
    res.send('login');
});

module.exports = router;
