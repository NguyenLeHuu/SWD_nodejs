const jwt = require("jsonwebtoken");

module.exports = function authenToken(req, res, next) {
  //#swagger.autoHeaders=false
  const authorizationHeader = req.headers["authorization"];
  console.log("this is tesst " + authorizationHeader);
  if (authorizationHeader !== undefined) {
    const token = authorizationHeader.split(" ")[1];

    if (!token) res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if (err) res.sendStatus(403);
      next();
    });
  } else {
    res.sendStatus(401);
    next();
  }
};
