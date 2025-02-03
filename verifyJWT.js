const jwt = require ('jsonwebtoken');


const verifyJWT =  (req,res,next) => {
    const authheader = req.headers.authorization || req.headers.Authorization;

if (!authheader|| !authheader.startsWith("Bearer ")){
    return res.status(401).json({message:"Unothorized"});
}
const token = authheader.split(' ')[1]

jwt.verify(token,process.env.ACCESS_TOKEN_SECRET , (err, decoded)=> {
    if (err) return res.status(403).json({message : "Forbidden"});
    req.user = decoded.userInfo.id;
    next();
});

};

module.exports=verifyJWT;
