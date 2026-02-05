import jwt from "jsonwebtoken";


export const refreshAccessToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "No refresh Token",
    });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err)
      return res.status(403).json({
        message: "Invalid Token",
      });
  });

  const newAccessToken = jwt.sign(
    {
      id: decoded.id,
    },
    process.env.ACCESS_TOKEN,
    {
      expiresIn: "15m",
    },
  );

  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  return res.json({
    accessToken: newAccessToken,
  });
  //
};
