const User = require ("../models/User");
const bcrypt = require("bcrypt");
const  jwt=require('jsonwebtoken'); 
const register =async (req,res)=>{

    //
    const { first_name, last_name, email, password } = req.body; // lowercase email and password
    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

        
//function to check duplicated emails 
try {
    const duplicatedEmails = await User.findOne({ email }).exec();
    if (duplicatedEmails) {
        return res.status(409).json({ message: "User already exists" }); // Use 409 status code
    }
    const hashedPassword = await
     bcrypt.hash(password, 10);
    await User.create({
        first_name,
        last_name,
        email,  
        password: hashedPassword, // lowercase password
    }); 
    return res.status(201).json({ message: "User created successfully" });

     
} catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" }); e
}
} 
 // login 
 const Login  =async (req,res)=>{
    const { email, password } = req.body; 
    if ( !email || !password) {
        return res.status(400).json({ message: "champ required !!" });
    }


const foundedUser=await User.findOne({email}).exec(); 
if(!foundedUser){
    return res.status(401).json ({message:"user doesn't have an account "}); 
}
const isMatch=await 
bcrypt.compare (password,foundedUser.password); 
if (!isMatch){

    return res.status(401).json ({message:"password is wrong , try another one  "}); 

}
const accessToken=jwt.sign({
    userInfo:{
        id:foundedUser._id
    }
},process.env.ACCES_TOKEN_SECRET,{expiresIn:"7d"});
res.status(200).send({
    accessToken, 
    id:foundedUser._id , 
    email:foundedUser.email 
});


 }; 

 module.exports={Login,
    register,} 

