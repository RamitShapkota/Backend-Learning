import { asyncHandler } from "../utils/asyncHandler.js";


const registerUser = asyncHandler( async (req, res) => {
    res.status(200).json({
        message: "register successfully"
    })
})
const loginUser = asyncHandler( async (req, res) => {
    res.status(200).json({
        message: "login sucessfully"
    })
})

export {registerUser , loginUser}