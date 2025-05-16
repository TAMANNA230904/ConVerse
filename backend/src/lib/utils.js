import jwt from "jsonwebtoken"
export const generateToken=(userId,res)=>{
     const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d",
     });

    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000, //millisec
        httpOnly:true, // XSS prevent scross-site scripting attacks
        sameSite:"strict",// CSRF attacks cross-site request forgery attacks
        secure:process.env.NODE_ENV!="development" ,//process.env.NODE_ENV!=="development"  //its true if the project is not in development mode
    })
    return token;
}