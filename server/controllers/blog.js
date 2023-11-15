import Blogs from "../models/blog.js";
import Members from "../models/members.js";
import BlogsComment from "../models/blogcomments.js";
import dotenv from "dotenv";
//get config vars
dotenv.config();

const getImageUrl = (req) => {
  const baseUrl = process.env.BASE_URL; // Replace with your base URL for serving images
  return `${baseUrl}/${req.file.path}`;
};

export const getAllBlogs = async (req, res) => {
  try {
    const listAllBlogs = await Blogs.findAll({
      include: Members,
      order: [["createdAt", "DESC"]],
    });
    res.json(listAllBlogs);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getEachMembersBlogs = async (req, res) => {
  try {
    const accessToken = req.user;
    const user_id = accessToken.userId.id;

    const listAllBlogs = await Blogs.findAll({
      include: [
        {
          model: Members,
          BlogsComment,
          where: { id: user_id },
        },
      ],
    });
    res.json({ listAllBlogs });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getBlogsById = async (req, res) => {
  try {
    // Get blog by id
    const getAllById = await Blogs.findAll({
      where: {
        id: req.params.id,
      },
      include: Members,
      BlogsComment,
    });

    res.json(getAllById[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createBlogs = async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "No file was uploaded" });
  }

  try {
    const { blog_text, blog_title, blog_category } = req.body;

    const accessToken = req.user;
    const user_id = accessToken.userId.id;

    const image = getImageUrl(req);

    try {
      const newBlogs = await Blogs.create({
        blog_text: blog_text,
        blog_title: blog_title,
        blog_category: blog_category,
        blog_image: image,
        user_id: user_id,
      });

      res
        .status(201)
        .send({ message: "Blog created successfully", data: newBlogs });
    } catch (error) {
      res.status(500).send({ message: "Failed to create blog", error });
    }
  } catch (error) {
    res.status(400).send({ message: "Invalid input data", error });
  }
};

export const createBlogsComment = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  try {
    const { comment_text, member_id, blog_id } = req.body;

    const newBlogsComment = await BlogsComment.create({
      comment_text: comment_text,
      member_id: member_id,
      blog_id: blog_id,
    });

    res.json(newBlogsComment, newCommentDetails);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteBlogsComment = async (req, res) => {
  try {
    await BlogsComment.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Blog Comment Successfully  Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateBlogs = async (req, res) => {
  try {
    await Blogs.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Blog Successfully Updated ",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteBlogs = async (req, res) => {
  try {
    await Blogs.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Blog Successfully  Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
