import {User} from "../models/user.js";
import jwt from "jsonwebtoken";

//to create a jwt token valid for 30 days
export function signToken(userId){
    const seceret=process.env.JWT_SECRET;
    if(!secret) throw new Error("JWT_SECRET is not set.");
    return jwt.sign({sub:userId}, secret, {expiresIn: process.env.JWT_EXPIRES_IN || "30d"}); 
}