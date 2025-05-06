import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  //create token -> you need user id and your jwt secret
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  //add token to cookie, here I named it "jwt", you can name it anything
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 100, //7 days in milliseconds
    httpOnly: true, // prevents XSS attacks
    sameSite: "strict", //prevents CSRF attacks
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};
