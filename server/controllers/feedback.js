import FeedBack from '../models/feedback.js';
import Members from '../models/members.js';



export const getAllFeedBack = async (req, res) => {
    try {
        const listAllFeedBack= await FeedBack.findAll({
            include: [Members, FeedBack]
        });
        res.json(listAllFeedBack);
      
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const getFeedBackById = async (req, res) => {
    try {
        const getAllById = await FeedBack.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(getAllById [0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const createFeedBack= async (req, res) => {

    try {
        const { message,   member_id } = req.body;
        const newFeedBack = await FeedBack.create({
            message: message,
            member_id: member_id
        });
        
        res.json(newFeedBack);
    } catch (error) {
        res.json({ message: error.message });
    }
}

 
export const deleteFeedBack= async (req, res) => {
    try {
        await FeedBack.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "FeedBack Successfully  Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}









 



