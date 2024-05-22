const express = require("express");
const router = express.Router();
const authController = require("./controllers/user/authController"); // Adjust the path
const authenticateToken = require("./services/middlewares/authenticationToken");
const { getUserOwnData, searchUsers, updateUser } = require("./controllers/user/userController");
const { addPost, getPosts, getPostByIdOrTitle } = require("./controllers/content/postController");

router.post("/login", authController.login);

router.post("/register", authController.register);
router.get("/userown", authenticateToken, getUserOwnData);
router.post('/search', searchUsers);
router.patch("/userown", authenticateToken, updateUser);
router.post("/posts", authenticateToken, addPost);
router.get("/posts", authenticateToken, getPosts);
router.get('/post', getPostByIdOrTitle);
router.get("/", (req, res) => {
  res.send("Hello from the server!");
});

module.exports = router;
