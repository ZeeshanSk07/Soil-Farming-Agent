const express = require('express');
const router = express.Router();
const { login, signup, Updateuser, adminlogin} = require('../controllers/user');


router.post('/login', login());
router.post('/signup', signup());
router.put('/update/:id', Updateuser());
router.post('/admin', adminlogin());

module.exports = router;