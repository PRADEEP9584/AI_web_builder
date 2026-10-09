import {User} from "../models/user.js"
import {Project} from "../models/project.js";
import {generateOtp, sendOtpEmail, saveOtp, verifyOtp, resendRegister} from "../utils/services.js"


//issue an otp and send it via email
async function issueAndSend(email,name,status,res,code=201){
    const otp= generateOtp();
    saveOtp(email, otp);
    await sendOtpEmail({to:email, name, code:otp, purpose:status});
    return res.status(code).json({ok:true, email});
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
            return issueAndSend(email, existing.name, "signup", res, 200);
        }
        const user= await User.create({
            name,
            email,
            passwordHash: await User.hashPassword(password),
            emailVerified: false
        })
        return issueAndSend(user.email, user.name, "signup", res, 201);
    }
    catch(err){
        next(err);
    }
}


//verify the otp and make user verified
export async function verifyRegister(req, res, next){
    try{
        const{email, code}=req.body;
        if(!email||!code)
            return res.status(400).json({
        error: "Email and code are required."
        })

        const user=await User.findOne({email});
        if(!user)
            return res.status(404).json({
                error: "No account found with this email."
        })
        if(user.emailVerified)
            return res.json({
                ok:true, alreadyVerified:true
        });
        const result=verifyOtp(email, code);
        if(!result.ok) return res.status(400).json({error: result.reason});

        user.emailVerified=true;
        await user.save();
        res.json({ok: true});
    }
    catch(err){
        next(err);
    }
}


//to resend the otp or if user registers but forgots to verify
//we can reverify them
export async function resendRegister(req, res, next){
    try{
      const email=(req.body.email || "").trim().toLowerCase();
      if(!email) return res.status(400).json({error:"Email is required."});
      
      const user=await User.findOne({email});
      if(!user)
        return res.status(404).json({error:"No account found with this email."});
      if(user.emailVerified)
        return res.status(400).json({error:"This email is already verified - just sign in."});
    }
    catch(err){

    }
}