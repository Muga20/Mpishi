import Comments from '../models/comments.js';
import Members from '../models/members.js';
import Recipe from '../models/recipe.js';


export const getAllComments = async (req, res) => {
    try {
        const listAllComments = await Comments.findAll({
            include: [Members, Recipe]
        });

        res.json(listAllComments);
      
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const getCommentsById = async (req, res) => {
    try {
        const getAllById = await Comments.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(getAllById [0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const createComments= async (req, res) => {

    try {
        const { text,  recipe_id,  member_id } = req.body;
        const newComment = await Comments.create({
            text: text,
            recipe_id: recipe_id,
            member_id: member_id
        });
        
        res.json(newComment);
    } catch (error) {
        res.json({ message: error.message });
    }
}

 
export const updateComments= async (req, res) => {
    try {
        await Comments.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Comments Successfully Updated "
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const deleteComments= async (req, res) => {
    try {
        await Comments.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Comments Successfully  Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}









 



