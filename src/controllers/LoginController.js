const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
const LoginService = require("../services/LoginService");
const db = require("../models/index");
var refreshTokens = [];
module.exports = {
  async checkUserAccount(req, res) {
    //kiểm tra token từ firebase
    //--> đúng thì kiểm tra db có user này chưa, role gì
    //------> chưa có thì lưu db, respone về fe bắt chọn role
    //------> có rồi thì cho vào dashboard
    //--> sai thì gửi lỗi

    // Authentication
    // if (req.hasOwnProperty("_idToken")) {
      console.log(req.body.idToken);
      console.log(req.body.idToken.toString());
      const idToken = req.body.idToken.toString();
      let checkRevoked = true;
      admin
        .auth()
        .verifyIdToken(idToken, checkRevoked)
        .then((data) => {
          console.log(data);
          //account gmail có tồn tại đc xác thực từ firebase

          //sau đó kiểm tra db
          const uid = data.uid;
          // let accountInDB = checkUserInDB(uid);
          // accountInDB.then((accountInDB) => {
          //if{accountInDB}{
          if (true) {
            //da ton tai trong db
            //gui ve cho client cac token, role
            const accessToken = jwt.sign(
              { uid: data.uid },
              process.env.ACCESS_TOKEN_SECRET,
              {
                expiresIn: "3600s",
              }
            );
            const refreshToken = jwt.sign(
              { uid: data.uid },
              process.env.REFRESH_TOKEN_SECRET
            );
            refreshTokens.push(refreshToken);
            res.json({ accessToken, refreshToken });
          } else {
            //chua co trong db, gui response client bat chon role
            res.status(200).json({
              status: 200,
              message: "chua co tai khoan, chon role dang ky di",
            });
          }
          //  });
        })
        .catch((e) =>
          res.status(400).json({
            //token bi loi
            status: 400,
            message: e.message,
            error: e,
          })
        );
    // }else{
    //   console.log("_____khong lay dc IDToken");
    // }
  },

  async refreshToken(req, res) {
    try {
      const refreshToken = req.body.token;
      if (!refreshToken) res.sendStatus(401);
      if (!refreshTokens.includes(refreshToken)) res.sendStatus(403);
  
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
        console.log(err, data);
        console.log(refreshTokens);
        if (err) res.sendStatus(403);
        const accessToken = jwt.sign(
          //   { username: data.username },
          { uid: data.uid },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "3600s",
          }
        );
        res.json({ accessToken });
      });    
    } catch (error) {
      console.log("_______(refreshTokenErr)");
    }
  },
};
async function checkUserInDB(uid) {
  let AccountRole = null;
  console.log(db.Admin);
  try {
    console.log("__checkUserInDB");
    let AccountRoleAdmin = await db.Admin.findByPk(uid);
    if (AccountRoleAdmin) {
      AccountRole = AccountRoleAdmin;
      console.log(AccountRole);
      return AccountRole;
    }
    let AccountRoleCreator = await db.Creator.findByPk(uid);
    if (AccountRoleCreator) {
      AccountRole = AccountRoleCreator;
      console.log(AccountRole);
      return AccountRole;
    }
    let AccountRoleCustomer = await db.Customer.findByPk(uid);
    if (AccountRoleCustomer) {
      AccountRole = AccountRoleCustomer;
      console.log(AccountRole);
      return AccountRole;
    }
  } catch (error) {
    console.log("___Problem when query DB____");
  }
}
