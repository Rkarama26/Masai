const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const BlogModel = require("../models/blogs.model");

const blogRouter = express.Router();

blogRouter.use(authMiddleware);


// create blog
blogRouter.post("/", async (req, res) => {
    try {
        const { title, content, tags } = req.body;

        const blog = new BlogModel({
            title,
            content,
            tags,
            createdBy: req.user, // from decoded JWT
        });

        await blog.save();
        res.status(201).json({ message: "Blog created successfully", blog });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//get blog
blogRouter.get("/", async (req, res) => {
    try {
        const blogs = await BlogModel.find({ createdBy: req.user });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// update
blogRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findOne({ _id: id, createdBy: req.user });

        if (!blog) {
            return res.status(404).json({ error: "Blog not found or unauthorized" });
        }

        // Update only allowed fields
        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;
        blog.tags = req.body.tags || blog.tags;

        await blog.save();
        res.status(200).json({ message: "Blog updated successfully", blog });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// delete blog
blogRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findOneAndDelete({ _id: id, createdBy: req.user });

        if (!blog) {
            return res.status(404).json({ error: "Blog not found or unauthorized" });
        }

        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = blogRouter;