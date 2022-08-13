const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getUser} = require('../service/user.js')
const {auth} = require('../middlewares/auth.js')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', auth, getUser)

module.exports = router;