import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import {User} from "../models/user.model.js"


const registerUser = asyncHandler(async (req, res) => {
    //get user details from frontend
    //validation - not empty
    //check if usser already exists: username, email
    //check for images, check for avatar
    //upload them to cloudinary, avatar
    //create user object - create entry in db
    //remove  passwoard and refresh token field from response
    //check for user creation 
    //return res

    const { fullName, email, username, password } = req.body;
    console.log("requested data: ",req.body);
    
    console.log("email: ", email);
    console.log("fullName: ", fullName);
    console.log("username: ", username);
    console.log("password: ", password);

    //validation
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "all fields are required")
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email))
    {
        throw new ApiError(400, "Invalid email")
    }

    //user exist or not

    const existedUser = await User.findOne({
        $or: [
            {username},
             {email}
            ]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username already exists")
    }

    //handle images





})


export { registerUser }