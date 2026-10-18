import {User} from "../models/user.js";

//to create a jwt token valid for 30 days
export function signToken(userId){
    const seceret=process.env.JWT_SECRET;
}