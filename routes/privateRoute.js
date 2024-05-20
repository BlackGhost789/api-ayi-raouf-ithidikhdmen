import jwt from "jsonwebtoken";


//this is a middelware function used 
//note a midellware functin can send a respnd 

export function auth(req , res , next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send("Access Denied");

    try{
        const verified = jwt.verify(token , "randomPasswordTokenHelloworldRaoufTouati");
        //here verified is the email object
        req.user = verified;
   
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
}
