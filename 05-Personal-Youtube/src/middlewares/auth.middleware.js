import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";
import jwt from "jsonwebtoken";
import {User} from "../models/user.model"


export const verifyJWT = asyncHandler(async (req,res,next) => {

    try {
        //Extract Token
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
    
        if(!token){
            throw new ApiError(401, "Unauthorized request")
        }
    
        // Verify JWT Token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        //Find User From Database
       const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
       if (!user) {
        //TODO discuss about frontend
        throw new ApiError(401,"Invalid Access Token")    
       }
    
       //Attach user to req.user
       req.user = user;
       next()
    
    } catch (error) {
        throw new ApiError(401, "Invalid or expired token");
    }
})



//This middleware protects private routes by checking whether the user is logged in with a valid JWT token.

// Where We Use It

// Example routes:

// router.get("/profile", verifyJWT, getUserProfile)

// router.post("/upload", verifyJWT, uploadVideo)

// router.delete("/tweet/:id", verifyJWT, deleteTweet)


/*
Complete Authentication Flow

User logs in
↓
Server creates JWT token
↓
Browser stores token in cookie
↓
User requests protected route
↓
verifyJWT middleware runs
↓
Extract token
↓
Verify token
↓
Find user
↓
Attach user to req.user
↓
next()
↓
Protected controller executes

*/