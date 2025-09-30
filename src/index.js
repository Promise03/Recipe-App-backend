import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { dbConnection } from "./config/dbConnection.js";
import userRoutes from "./route/users.js";
import recipeRoutes from "./route/recipe.js";
import cors from "cors";
import analytisRoutes from "./route/analytis.js";
import logger from "./utils/logger.js";
import otpRouters from "./route/otp.js"
import { fileURLToPath } from "url";
import path from "path";
import fs from 'fs'
// import { apilimiter } from "./middleware/rateLimit.js";
// import httpStatus from "http-status"
// creating an instance for express server
const app = express();
dotenv.config();
// Defining Port
const PORT = process.env.PORT || 3000;
if (process.env.ENV === "development") {
  app.use(morgan("dev"));
}

// integrate morgan into winston
app.use(
  morgan("combined", {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}))

app.use((req, res, next, err) => {
logger.error(`${err.status || 500}- ${err.message}`);
res.status(err.status || 500).json({error:err.message})
})
// define the route endpoint
app.use(express.json());
// cors setup
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, "uploads");
if(!fs.existsSync(UPLOAD_DIR)){
  fs.mkdirSync(UPLOAD_DIR, {recursive: true})
}
app.use("/uploads", express.static(UPLOAD_DIR))
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/",  otpRouters), 
app.use("/api/user",  userRoutes), 
app.use("/api/recipes", recipeRoutes);
app.use("/api/analytis", analytisRoutes );
//directory for client build files 
const clientBuildPath = path.join(__dirname, "..", "..", "frontend", "build");
const clientDistPath = path.join(__dirname, "..", "..", "frontend", "dist");

// conditionally serve client buid files if in production
if(process.env.ENV === "production")
{
  if(fs.existsSync(clientBuildPath)){
    app.use(express.static(clientBuildPath));
    app.get("*", (req, res) =>{
      res.sendFile(path.join(clientBuildPath, "index.html"))
    });
  }else if (fs.existsSync(clientDistPath)){
    app.use(express.static(clientDistPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(clientDistPath, "index.html"))
    });
  } else{ console.log("Client build files not found")

  }
}

dbConnection()
  .then(() => {
    console.log("Database connected successfully!");
    // Call Your app to listen to a port
    app.listen(PORT, () => {
      console.log(`Server running at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`An occured while connection to datebase ${err}`);
  });
export default app;
