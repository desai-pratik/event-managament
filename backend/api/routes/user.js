const express = require("express");
const router = express.Router();
const bcrypt=require('bcrypt')
const jwt = require('../../middleware/jwtAssign');
const User = require('../../models/user');
const { default: mongoose } = require("mongoose");

router.post('/register',(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then((result)=>{
        if(result.length>1)
        {
            res.status(200).json({
                message:'Email already exists'
            })
        }
        else
        {
            bcrypt.hash(req.body.password,12,(err,hash)=>{
                if(err)
                {
                    return res.status(500).json({
                        error:err
                    })
                }
                else{
                    const user=new User({
                        _id: new mongoose.Types.ObjectId(),
                        name:req.body.name,
                        email:req.body.email,
                        password:req.body.password,
                    });
                    user
                    .save()
                    .then((result)=>res.status(201).json({
                        message:'User Registered'
                    }))
                    .catch(err=>res.status(500).json({
                        error:err
                    }))
                }
            })
        }
    })
})

router.post("/signIn", (req, res, next) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        return res.status(400).json({ message: "Authentication failed" });
                    }
                    if (result) {
                        const token = jwt.generateJWT({ 
                            email: user.email, 
                            userId: user._id 
                        });
                        res.cookie('token', token, { httpOnly: true });

                        return res.status(201).json({ message: "Logged in successfully", token });
                    } else {
                        return res.status(400).json({ message: "Password incorrect" });
                    }
                });
            } else {
                return res.status(400).json({ message: "User not found" });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
});

module.exports = router;