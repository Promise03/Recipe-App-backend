import User from "../../models/users/user.js";
import httpStatus from "http-status"

// controller to fetch user details by query
export const getuser = async(req, res) => {
    try{
        // get user query parameters
        const type =req.query.type;
        const id = req.query.id;
        const email = req.query.email;
        const username = req.query.username;

        let user;
        switch(type){
            case "id":
                user = await User.findById(id);
                if (!user) {
                     res.status(httpStatus.NOT_FOUND).json({
                        status: "Not found",
                        message: `User with the id ${id} not found!`,
                    });
                    break;

                }else{
                     res.status(httpStatus.OK).json({
                        status: "success",
                        Userdetail: user,
                    });
                    break;
                }

                // query by email
                case "email":
                    user = await User.findOne({email});
                    if(!user){
                        res.status(httpStatus.NOT_FOUND).json({
                            status: "Not Found",
                            message: `User with email: ${email} not found`,
                        });
                        break;
                    }
                    res.status(httpStatus.OK).json({
                        status: "success",
                        Userdetail: user,
                    });
                    break;

                    case "username":
                    user = await User.findOne({username});
                    if(!user){
                        res.status(httpStatus.NOT_FOUND).json({
                            status: "Not Found",
                            message: `User with email: ${username} not found`,
                        });
                        break;
                    }
                    res.status(httpStatus.OK).json({
                        status: "success",
                        Userdetail: user,
                    });
                    default:
                        res.status(httpStatus.NOT_FOUND).json({
                            status: "Not found",
                            message: "No record(s) found!"
                        })
                        }

                        
                    
    }catch(error){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: "error",
            message: error.message,
        })
    }
}

