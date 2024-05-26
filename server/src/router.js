const express = require("express");
const router = express.Router();
const authController = require("./controllers/user/authController"); // Adjust the path
const authenticateToken = require("./services/middlewares/authenticationToken");
const { getUserOwnData, searchUsers, updateUser, getUserProfileById } = require("./controllers/user/userController");
const { addPost,getUserPostsByUserId, getPostByIdOrTitle, deletePost, editPost } = require("./controllers/content/postController");
const {addExperience, getExperiencesByUserId} = require('./controllers/content/experienceController');

router.post("/login", authController.login);

router.post("/register", authController.register);
router.get("/userown", authenticateToken, getUserOwnData);
router.post('/search', searchUsers);
router.patch("/userown", authenticateToken, updateUser);
router.post("/posts", authenticateToken, addPost);
router.get("/posts/:userId", authenticateToken, getUserPostsByUserId);
router.delete('/post/:id', authenticateToken, deletePost);
router.get('/post', getPostByIdOrTitle);
router.patch('/post/:id', authenticateToken, editPost); 
router.post('/experiences', authenticateToken, addExperience);
router.get('/experiences/:userId', authenticateToken, getExperiencesByUserId);
router.get("/user/:userId", authenticateToken, getUserProfileById);
router.get("/", (req, res) => {
  res.send("Hello from the server!");
});

module.exports = router;
