import Category from "../models/category.js";
import Recipe from "../models/recipe.js";




export const getAllRecipes = async (req, res) => {
    try {
        const listAllRecipes= await Recipe.findAll({include:Category});
        res.json(listAllRecipes);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const getRecipesById = async (req, res) => {
    try {
        const getAllById = await Recipe.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(getAllById [0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}


export const  createRecipes = async (req, res) => {
   {
    let info = {
        name: req.body.name,
        cat_id: req.body.cat_id,
        image: req.file.path,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        step_two:req.body.step_two,
        step_three:req.body.step_three,
        step_four:req.body.step_four,
        step_five:req.body.step_five,
        step_six:req.body.step_six,
        step_seven:req.body.step_seven,
        cook_time: req.body.cook_time,
        about_the_recipe: req.body.about_the_recipe,
        serves: req.body.serves,

    }

    try {
        const rep = await Recipe.create(info)
        res.status(200).send(rep)
    } catch (error) {
        res.json({ message: error.message });
    }
}
}


export const updateRecipes = async (req, res) => {
    
    let id = req.params.id
    
        let update = {
            name: req.body.name,
            category: req.body.category,
            image: req.file.path,
            ingredients: req.body.ingredients,
            steps: req.body.steps,
            step_two:req.body.step_two,
            step_three:req.body.step_three,
            step_four:req.body.step_four,
            step_five:req.body.step_five,
            step_six:req.body.step_six,
            step_seven:req.body.step_seven,
            cook_time: req.body.cook_time,
            about_the_recipe: req.body.about_the_recipe,
            serves: req.body.serves,
    
        }  
        try {
            const resp = await Recipe.update(update ,{where: {id: id }})
            res.status(200).send(resp)
        } catch (error) {
            res.json({ message: error.message });
        }
    
}


export const deleteRecipes  = async (req, res) => {
    try {
        await Recipe.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Recipe Successfully Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}




