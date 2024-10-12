const express = require('express');
const router = express.Router();
const { login, signup, Updateuser, adminlogin, updateAdmin} = require('../controllers/user');
const { verifyToken } = require('../middlewares/verifyToken');


router.post('/login', login());
router.post('/signup', signup());
router.put('/update/:id', Updateuser());
router.post('/admin', adminlogin());
router.put('/admin/:id',verifyToken, updateAdmin())

module.exports = router;