const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const { verifyRoles } = require('../middleware/verifyRoles'); // Ensure correct import
const userController = require('../cntrollers/userController');

// Uncomment to protect all routes with JWT verification
// router.use(verifyJWT);

router.route("/getAllUsers").get(userController.getAllUsers);
router.route("/:id").get(userController.getUserById);
router.route("/:update/:id").get(userController.UpdateUser);

// Protected route
router.route("/getallUsers").get(verifyRoles('admin', 'moderateur'), userController.getAllUsers);

module.exports = router;
