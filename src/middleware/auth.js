import httpStatus from "http-status";
import jwt from "jsonwebtoken";

const authorizeUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      status: "Unauthorized",
      message: "Token not provided!",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);
    req.user = decoded;
    next();
  } catch (e) {
    console.error("JWT Error:", e.message);
    return res.status(httpStatus.UNAUTHORIZED).json({
      status: "Unauthorized",
      message: "Unauthorized: Token failed!",
    });
  }
};

const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    console.log("Allowed Roles:", allowedRoles);
    console.log("User Role:", req.user.role); // 👈 check this

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(httpStatus.FORBIDDEN).json({
        status: "FORBIDDEN",
        message: "Forbidden: Access denied!",
      });
    }
    next();
  };
};

export { authorizeUser, checkRole };