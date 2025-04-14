const expres=require('express')
const router=expres.Router()
const User=require('../Models/auth')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const env=require('dotenv').config()
const JWT_SECRET=process.env.JWT_SECRET
const fetchuser=require('../Middleware/fetchuser')

router.post('/createuser', async (req,res)=> {
    let success=false
    try{
    let user=await User.findOne({email:req.body.email})
    if (user) {
        return res.status(400).json({success:false,"message":"User with this email already exists"})
    }
    const salt= await bcrypt.genSalt()
    const secpassword=await bcrypt.hash(req.body.password,salt)
    user=await User.create({
        name:req.body.name,
        email:req.body.email,
        password:secpassword
    })
    const data={
        user:{
            id:user.id
        }
    }
    const jwtdata=jwt.sign(data,JWT_SECRET)
    success=true
    res.json({success,jwtdata})

} catch(error) {
    console.log("Error : ",error.message)
    res.status(500).send("Internal Server Error")
}
})

router.post('/login', async (req,res)=> {
    let success=false
    const {email,password}=req.body
    try{
    let user=await User.findOne({email})
    if (!user) {
        return res.status(400).json({success:false,error:"Please login with correct credentials"})
    }
    const passcompare=await bcrypt.compare(password,user.password)
    if (!passcompare) {
        return res.status(400).json({success:false,error:"Please login with correct credentials"})
    }
    const data={
        user:{
            id:user.id
        }
    }
    const jwtdata=jwt.sign(data,JWT_SECRET)
    success=true
    res.json({success,jwtdata})


} catch(error) {
    console.log("Error : ",error.message)
    res.status(500).send("Internal Server Error")
}
})

router.post('/getuser', fetchuser, async (req, res) => {
    try {
      let user = await User.findById(req.user.id).select('-password');
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json(user);
    } catch (error) {
      console.error("Error in /getuser route:", error.message);
      res.status(500).send("Internal Server Error");
    }
  });
  
module.exports=router