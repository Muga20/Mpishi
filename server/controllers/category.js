import Category from "../models/category.js";
import Recipe from "../models/recipe.js";
import dotenv from "dotenv";
//get config vars
dotenv.config();

const getImageUrl = (req) => {
  const baseUrl = process.env.BASE_URL; // Replace with your base URL for serving images
  return `${baseUrl}/${req.file.path}`;
};

export const getAllCategory = async (req, res) => {
  try {
    const listAllCategories = await Category.findAll();

    res.json(listAllCategories);
    // console.log(listAllBlogs)
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;

    const category = await Category.findByPk(id, {
      include: [{ model: Recipe, as: "recipes" }],
    });

    if (!category) {
      return res.status(404).send({ error: "Category not found" });
    }

    return res.status(200).send({ category });
  } catch (error) {
    return res
      .status(500)
      .send({ error: "An error occurred while fetching the category" });
  }
};

export const createCategory = async (req, res) => {
  try {
    const image = getImageUrl(req);

    const newCategory = await Category.create({
      name: req.body.name,
      image: image,
    });
    res.json(newCategory);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  let id = req.params.id;
  let update = {};

  const image = getImageUrl(req);

  if (req.body.name) update.name = req.body.name;
  if (req.file) update.image = image;

  try {
    const resp = await Category.update(update, { where: { id: id } });
    res.status(200).send(resp);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Category Successfully  Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
