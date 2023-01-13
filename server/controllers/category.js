import Category from '../models/category.js';


export const getAllCategory = async (req, res) => {
    try {
        const listAllCategories = await Category.findAll();

        res.json(listAllCategories);
        // console.log(listAllBlogs)
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const getCategoryById = async (req, res) => {
    try {
        const getAllById = await Category.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(getAllById [0]);
    } catch (error) {
        res.json({ message: error.message });
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
    
    let id = req.params.id
    
        let update = {
            name: req.body.name,
            image: req.file.path,
        }  
        try {
            const resp = await Category.update(update ,{where: {id: id }})
            res.status(200).send(resp)
        } catch (error) {
            res.json({ message: error.message });
        }
    
}
 
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









 



