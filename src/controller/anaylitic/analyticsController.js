import httpStatus from "http-status";
import User from "../../models/users/user.js";


const getUserCountByRole = async (req, res) => {
    try{
        const result = await User.aggregate([
            {$group: {_id: "$role", count: {$sum: 1}}},
            {$sort: {count: -1}}
        ])
        res.status(httpStatus.OK).json({
            status: "Success", 
            data: result})
    }catch(e){
        res 
        .status(httpStatus.INTERNAL_SERVER_ERROR)
        .json({status: "Error", message: e.message})
    }
}

export default getUserCountByRole