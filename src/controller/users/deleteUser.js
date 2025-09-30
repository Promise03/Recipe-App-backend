import User from "../../models/users/user.js";
import httpStatus from "http-status"


// function to delete User
export const deleteUser = async (req, res) => {
    try{
        // get the id of the User from th request paramenter
        const { id } = req.params;

        // find the user by id
        let user;
        user = await User.findById(id);
        if (!user){
            return res.status(httpStatus).json({
                status: "Not found",
                message: `User with this id ${id} not found`
            })
        }

        await User.findByIdAndDelete(id);

        res.status(httpStatus.OK).json({
            status: "successful",
            message: `User with id: ${id} deleted successfully!`
        })

    }catch(e){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            status: "error",
            message: "An error occured while deleting the user",
            error: e.message,
        })
    }
}