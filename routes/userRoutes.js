const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('/', controller.getAllUsers);
router.get('/:id', controller.getSingleUser);
router.post('/', controller.createUser);
router.put('/:id', controller.updateUser);
router.put('/upgrade/:id', controller.updateUsersAccessLevel);
router.delete('/:id', controller.deleteUser);

module.exports = router;