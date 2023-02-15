const LoginService = require("../services/LoginService");
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
var refreshTokens = [];
module.exports = {
  async checkUserAccount(req, res) {
    //kiểm tra token từ firebase
    //--> đúng thì kiểm tra db có user này chưa, role gì
    //------> chưa có thì lưu db, respone về fe bắt chọn role
    //------> có rồi thì cho vào dashboard
    //--> sai thì gửi lỗi

    // Authentication
    const idToken = req.body
    // .idToken.toString();
    // let checkRevoked = true;
    // admin
    //   .auth()
    //   .verifyIdToken(idToken, checkRevoked)
    //   .then((data) => {console.log(data);}
    //     //account gmail có tồn tại đc xác thực từ firebase 
        
    //   )
    //   .catch((e) => console.log(e))

    const accessToken = jwt.sign(idToken, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "300s",
    });
    const refreshToken = jwt.sign(idToken, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);
     res.json({ accessToken, refreshToken });
    // return res.status(200).json({
    //     status: 200,
    //     message: "Get agency successful!",
    //     data: accessToken,
    //   });

    // let data = await LoginService.getAll();
    // return res.status(200).json({
    //   status: 200,
    //   message: "Get agency successful!",
    //   data: data,
    // });
  },

  async refreshToken(req, res) {
  const refreshToken = req.body.token;
  if (!refreshToken) res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) res.sendStatus(403);

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
    console.log(err, data);
    console.log(refreshTokens);
    if (err) res.sendStatus(403);
    const accessToken = jwt.sign(
    //   { username: data.username },
      { username: data.name },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30s",
      }
    );
    res.json({ accessToken });
  })
  },
};
