import sendEmail from '../middleware/send.email.js'; // Correct way to import named exports
import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    try {
        const {fullname, email, password} = req.body;
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }
        const hashPassword = await bcryptjs.hash(password,10)
        const createdUser = new User({
            fullname,
            email,
            password: hashPassword
        })
        await createdUser.save();
        res.status(201).json({message:"User created succesfully", user: {
            _id: createdUser._id,
            fullname: createdUser.fullname,
            email: createdUser.email,
        },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({message:"Internal server error"});
        
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!user || !isMatch){
            return res.status(400).json({message:"Invalid username or password"});
        
        }
        
        
        else{
            res.status(200).json({message:"Login successful", user:{
                _id: user._id,
                fullname: user.fullname,
                email:user.email
            }})
        }
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({message: "User does not exist"});
    }
}

export const contact = async (req, res) => {
    try {
        const {fullname, email, message} = req.body;
        console.log(email);
        
        const to_email = "abhijeetkamalekar15@gmail.com"
        const sub = `Contact message from ${fullname} ${email}`;
        const text = message;
        sendEmail(to_email, sub, text);
        res.status(200).json({message:"Message sent!"})
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({message: "Internal server error"});
    }
}