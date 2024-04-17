import jwt from 'jsonwebtoken';
export async function isAuth(req,res,next){
    if(!req.cookies.accessToken){
        res.status(401).json("message", "Please log in first");
        next()
    }
    const decodedJwt = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET)       

    req.user = decodedJwt;
    next();
}