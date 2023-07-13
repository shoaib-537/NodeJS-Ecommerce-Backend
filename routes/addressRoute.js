const { updateAddress, getAddress } = require('../controllers/addressController')
const { verifyToken } = require('../middleware/jwt');
const express = require('express')



const router = express.Router();

router.put("/:userId", verifyToken, updateAddress)
router.get("/:userId", verifyToken, getAddress)


module.exports = router;