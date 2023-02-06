import Category from '../models/category.js';
import Recipe from '../models/recipe.js';


export const getAllCategory = async (req, res) => {
    try {
        const listAllCategories = await Category.findAll(
            
        );

        res.json(listAllCategories);
        // console.log(listAllBlogs)
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const getCategoryById = async(req, res) => {
    try {
        const id = req.params.id

        const category = await Category.findByPk(id, {
            include: [{ model: Recipe, as: 'recipes' }]
        });

        if (!category) {
            return res.status(404).send({ error: 'Category not found' });
        }

        return res.status(200).send({ category });
    } catch (error) {
        return res.status(500).send({ error: 'An error occurred while fetching the category' });
    }
}

export const createCategory= async (req, res) => {

    try {
      
        const newCategory = await Category.create({
            name: req.body.name,
            image: req.file.path,
        });
        res.json(newCategory);
    } catch (error) {
        res.json({ message: error.message });
    }
}

 
export const updateCategory = async (req, res) => {
    let id = req.params.id;
    let update = {};
    
    if (req.body.name) update.name = req.body.name;
    if (req.file) update.image = req.file.path;
    
    try {
        const resp = await Category.update(update, { where: { id: id } });
        res.status(200).send(resp);
    } catch (error) {
        res.json({ message: error.message });
    }
};

 
export const deleteCategory= async (req, res) => {
    try {
        await Category.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Category Successfully  Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}







 



