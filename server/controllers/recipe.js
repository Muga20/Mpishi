import Category from "../models/category.js";
import Recipe from "../models/recipe.js";

export const getAllRecipes = async (req, res) => {
  try {
    const listAllRecipes = await Recipe.findAll({
      include: [
        {
          model: Category,
          attributes: ["name"],
        },
      ],
    });
    res.json(listAllRecipes);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const getRecipesById = async (req, res) => {
  try {
    const getAllById = await Recipe.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(getAllById[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const createRecipes = async (req, res) => {
  let category;

  if (!req.file) {
    return res.status(400).send({ message: 'No file was uploaded' });
  }

  try {
    // Check if category already exists
    category = await Category.findOne({ name: req.body.category });
    if (!category) {
      // Create the category
      category = await Category.create({ name: req.body.category });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }

  let info = {
    name: req.body.name,
    cat_id: category.id,
    image: req.file.path,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
    cook_time: req.body.cook_time,
    about_the_recipe: req.body.about_the_recipe,
    serves: req.body.serves,
    member_id: req.body.member_id,
  };


  try {
    const rep = await Recipe.create(info);
    res.status(201).send({ message: 'Recipe created successfully', data: rep });
  } catch (error) {
    res.status(500).send({ message: 'Failed to create recipe', error });
  }
};


export const updateRecipes = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Missing recipe ID in request params" });
    }

    const update = {};
    if (req.body.name) {
      update.name = req.body.name;
    }
    if (req.body.cat_id) {
      update.cat_id = req.body.cat_id;
    }
    if (req.body.ingredients) {
      update.ingredients = req.body.ingredients;
    }
    if (req.body.steps) {
      update.steps = req.body.steps;
    }
    if (req.body.cook_time) {
      update.cook_time = req.body.cook_time;
    }
    if (req.body.about_the_recipe) {
      update.about_the_recipe = req.body.about_the_recipe;
    }
    if (req.body.serves) {
      update.serves = req.body.serves;
    }
    if (req.file) {
      update.image = req.file.path;
    }

    const [updatedRowsCount] = await Recipe.update(update, { where: { id: id } });
    if (!updatedRowsCount) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    return res.status(200).send({ message: "Recipe updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const deleteRecipes = async (req, res) => {
  try {
    await Recipe.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Recipe Successfully Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
