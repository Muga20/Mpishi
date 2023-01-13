import jwt from "jsonwebtoken";
// const User = require('../models/members.js')


export const requireAuth = async (req,res,next) => {
    // verify authentication
    const {authorization} = req.headers
    if (!authorization) {
        return res.status(401).json({error : 'authorization token required '})
    }
 
    const token = authorization.split(' ')[1]
     try {
      //   const {id} =   jwt.verify(token , process.env.SECRET)
      const  user = jwt.verify(token, process.env.SECRET)
      //   req.user = await User.findOne({id}).select('Id')
      // req.user = await User.findOne({ id }).select('id')
       req.user=user
      next()
     } catch (error) {
        console.log(error);
        res.status(401).json({error: 'request is not auhorized'})
     }
 }

  const useRole = async (req ,res, next) =>{
  requireAuth(req ,res,()=>{
   if(req.user.role){
     next() 
   }else{
     res.status(403).json({error: 'request is not auhorized'})
   }
   } )
}


// module.exports = requireAuth 
// module.exports = useRole

// export default requireAuth

export default useRole

