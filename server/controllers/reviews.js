import Reviews from '../models/reviews.js';


export const getAllReviews = async (req, res) => {
    try {
        const listAllReviews = await Reviews.findAll();

        res.json(listAllReviews);
        // console.log(listAllBlogs)
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const getReviewsById = async (req, res) => {
    try {
        const getAllById = await Reviews.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(getAllById [0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const createReviews = async (req, res) => {

    try {
        const { text , rating } = req.body;
        const newReviews = await Reviews.create({
            text: text,
            rating: rating,
        });
        res.json(newReviews);
    } catch (error) {
        res.json({ message: error.message });
    }
}

 
export const updateReviews= async (req, res) => {
    try {
        await Reviews.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Reviews Successfully Updated "
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const deleteReviews= async (req, res) => {
    try {
        await Reviews.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "ReviewsSuccessfully  Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}









 



