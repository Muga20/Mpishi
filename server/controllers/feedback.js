import FeedBack from '../models/feedback.js';
import Members from '../models/members.js';
import Response from '../models/response.js';
import Sequelize from "sequelize";


export const getAllFeedBack = async (req, res) => {
    try {
        const listAllFeedBack = await FeedBack.findAll({
            include: [Members],
            order: [["createdAt", "DESC"]]
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
        const { message, member_id, image } = req.body;
     
        const newFeedBack = await FeedBack.create({
            message: message,
            member_id: member_id,
            image: image || null
        });
        res.json(newFeedBack);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


 
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

export const getInEachFeedBack = async (req, res) => {
    try {
        const getAllById = await FeedBack.findAll({
            where: {
                member_id: req.params.id
            }
        });
        res.json(getAllById);
    } catch (error) {
        res.json({ message: error.message });
    }  
}

export const createResponse = async (req, res) => {
    try {
        const { message, member_id, feedback_id } = req.body;
     
        const newResponse = await Response.create({
            message: message,
            member_id: member_id,
            feedback_id: feedback_id
        });
        res.json(newResponse);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
















 



