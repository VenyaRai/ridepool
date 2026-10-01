const jwt=require('jsonwebtoken');

module.exports=function auth(req,res,next){
    const header=req.headersauthorization || '';
    const token=header.startsWith('Bearer ')?header.slice(7):null;
    if(!token) {
        return res.status(401).json({
            message:'Please login first.'
        })
    }
    try {
        req.userId=jwt.verify(token,process.env.JWT_SECRET).id;
        next();
    } catch {
        res.status(400).json({
            message:'session expired.'
        })
    }
};