import User from "../../models/users/user.js";
import httpStatus from 'http-status';
 


export const userStats = async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $facet: {
          roleStats: [{ $group: { _id: "$role", total: { $sum: 1 } } }],
          nameLengthStats: [
            { $project: { length: { $strLenCP: "$name" } } },
            { $group: { _id: null, avgNameLength: { $avg: "$length" } } },
          ],
        },
      },
    ]);

    res.status(httpStatus.OK).json({ status: "Success", stats: result[0] });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ status: "Error", message: err.message });
  }
};
