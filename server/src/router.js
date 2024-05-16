const express = require("express");
const router = express.Router();
const authController = require("./controllers/user/authController"); // Adjust the path
const authenticateToken = require("./services/middlewares/authenticationToken");
const { getUserOwnData, searchUsers } = require("./controllers/user/userController");

router.post("/login", authController.login);

router.post("/register", authController.register);
router.get("/userown", authenticateToken, getUserOwnData);
router.post('/search', searchUsers);
router.get("/", (req, res) => {
  res.send("Hello from the server!");
});

module.exports = router;
