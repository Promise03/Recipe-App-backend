
import User from "../../models/users/user.js";
import httpStatus from "http-status"


// controller function to get all registered users

export const getUsers = async (req, res) => {
    try{
        const registeredUsers = await User.find({ })
        if (registeredUsers){
            return res.status(httpStatus.OK).json({
                status:"success",
                userDetails: registeredUsers
            })
        }else{
             return res.status(httpStatus.NOT_FOUND).json({
                status:"error",
                message: "No record(s) found!"
        })
             }
    }
    catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: "Not Found",
            message: "No record(s) found!",
        })
        
    }
};