import mongoose from "mongoose";
import { type } from "os";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    ingredients: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      require: true,
    },
      videoUrl: {
      type: String,
      require: true,
    },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
  },
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
    
  },

  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);
export default Recipe