module.exports = (req,res,next) =>{
    if (req.user.role !="admin") {
        return res.status(401).send({message:"unauthorized"})
    }
    next();
    } 