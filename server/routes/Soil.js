const express = require('express');
const {postSoil, getsoil_details, getallDetails, updatesoilDetails, deleteDetails} = require('../controllers/soil');
const {verifyToken} = require('../middlewares/verifyToken');
const router = express.Router();

router.get('/getall',verifyToken, getallDetails());
router.get('/getsoil/:id', getsoil_details());
router.post('/postsoil',verifyToken, postSoil());
router.put('/updatesoil/:id', updatesoilDetails());
router.delete('/deletesoil/:id', deleteDetails());

module.exports = router;