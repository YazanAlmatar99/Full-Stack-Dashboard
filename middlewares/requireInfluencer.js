module.exports = (req,res,next) =>{
    if (req.user.role != "influencer") {
        return res.status(401).send({message:"unauthorized"})
    }
    next();
    } 