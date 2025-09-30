import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      min: 4,
      max: 10,
      // unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      min: 10,
      required: true,
    },
    role: { type: String, enum: ["regular",  "admin"], default: "regular" },
   
// userId: {
//     type: String,
//     required: true,
//     unique: true, // This is the source of the error
//   },
  },


  {
    timestamps: true,
  }
);

//register user as a mongoose model
const User = mongoose.model("User", userSchema);
export default User;