import jwt from "jsonwebtoken";

export const authorizedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(400).json({ message: "pls login in" });
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decodedData);
  res.userData = decodedData._id;
  next();
};
