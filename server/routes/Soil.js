const express = require('express');
const {postSoil, getsoil_details, getallDetails, updatesoilDetails, deleteDetails} = require('../controllers/soil');
const {verifyToken} = require('../middlewares/verifyToken');
const router = express.Router();

router.get('/getall',verifyToken, getallDetails());
router.get('/getsoil/:id',verifyToken, getsoil_details());
router.post('/postsoil',verifyToken, postSoil());
router.put('/updatesoil/:id',verifyToken, updatesoilDetails());
router.delete('/deletesoil/:id',verifyToken, deleteDetails());

module.exports = router;