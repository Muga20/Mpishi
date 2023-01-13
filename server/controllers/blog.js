import Blogs from "../models/blog.js";


export const getAllBlogs = async (req, res) => {
    try {
        const listAllBlogs = await Blogs.findAll();
        res.json(listAllBlogs);
        // console.log(listAllBlogs)
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const getBlogsById = async (req, res) => {
    try {
        const getAllById = await Blogs.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(getAllById [0]);
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const createBlogs= async (req, res) => {
    let blog = {
        blog_image:req.file.path,
        blog_title:req.body.blog_title,
        blog_category:req.body.blog_category,
        blog_text:req.body.blog_text,
        feedback:req.body.feedback
    }
    try {
        const blogs = await Blogs.create(blog)
        res.status(200).send(blogs)
    }catch(error){
        res.json({message:error.message})
    }
}

 
export const updateBlogs= async (req, res) => {
    try {
        await Blogs.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Blog Successfully Updated "
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 
export const deleteBlogs = async (req, res) => {
    try {
        await Blogs.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Blog Successfully  Deleted"
        });
    } catch (error) {
        res.json({ message: error.message });
    }  
}
 



