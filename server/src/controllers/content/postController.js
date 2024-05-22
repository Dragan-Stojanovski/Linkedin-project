const Post = require("../../models/content/posts");

// Add a new post
exports.addPost = async (req, res) => {
    try {
      const { postTitle, postBody } = req.body;
      const userId = req.user.userId;
  
      const newPost = new Post({
        userId,
        postTitle,
        postBody,
      });
  
      await newPost.save();
  
      res.status(201).json({
        message: "Post created successfully",
        post: newPost,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error in creating post: " + error.message });
    }
  };
  
  // Get posts for logged-in user
  exports.getPosts = async (req, res) => {
    try {
      const userId = req.user.userId;
  
      const posts = await Post.find({ userId });
  
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error in fetching posts: " + error.message });
    }
  };

  exports.getPostByIdOrTitle = async (req, res) => {
    try {
      const { id, title } = req.query;
  
      if (!id && !title) {
        return res.status(400).json({ message: "Please provide either an ID or a title to search." });
      }
  
      let post;
  
      if (id) {
        post = await Post.findById(id);
      } else if (title) {
        post = await Post.findOne({ postTitle: title });
      }
  
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error in fetching post: " + error.message });
    }
  };