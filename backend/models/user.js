import mongoose from "mongoose";

const STARTING_CREDITS=20;

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    passwordHash:{
        type: String,
        required: true
    },
    credits: {
        type: Number,
        default: STARTING_CREDITS,
        min: 0
    }
})