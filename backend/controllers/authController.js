import {User} from "../models/user.js"
import {Project} from "../models/project.js";
import {generateOtp, sendOtpEmail} from "../utils/services.js"


//issue an otp and send it via email
async function issueAndSend(email,name,status,res,code=201){
    const otp= generateOtp();
    saveOtp(email, otp);
    await sendOtpEmail();
}

//to register a user and send otp
export async function register(req,res,next){
    try{
        const {name,email,password}=req.body;
        if(!name || !email || !password){
           return res.status(404).json({
            message: "All fields are required."
           })  
        }
        if(name.length<2)
            return res.status(400).json({
        error: "Name must be atleast 2 characters long."
        })
        if(password.length<6){
            return res.status(400).json({
                error: "Password must be atleast 6 characters long."
            })
        }
        const existing=await User.findOne({email});
        if(existing){
            if(existing.emailVerified)
                return res.status(409).json({
            error: "Email already in use."
            })
        }
    }
    catch(error){

    }
}