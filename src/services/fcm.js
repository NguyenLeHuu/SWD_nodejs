var FCM = require("fcm-node");
var serverKey =
  "AAAA7LqdmJY:APA91bFo9Thjb0kCmcN8I8S29QBpaA9KHfJ37JOxMD-FHVzenM5c2PvHetMC_Xs86iCzEI-dQAcmeDjagbxD195-7_lsBN2Oc43pzhrbG-TQBrlTMzKd1BFKoSHSwuHKIK2X81gaNiIh";
var fcm = new FCM(serverKey);

var message = {
  to: "cpXJrSNS66qYBZ2Kc2svrc:APA91bFjXfGYnjQ0XG8DM9a7hfd5neOrcSr5zKtU-Kos8jQh8gzoRgFAAzcnN_iDzhRIy1QSKOtqMu98vGeWYvwFHv7-Yc3pyUaEMs0eVOH91EUqbBO1ss_ftExPDFoDRV3wmNVfzvvF",
  notification: {
    title: "UiCha Company",
    body: '{"Message from node js app"}',
  },

  data: {
    //you can send only notification or only data(or include both)
    title: "ok cdfsdsdfsd",
    body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}',
  },
};

const msgtest = {
  to: "",
  notification: {
    title: "UiCha Company",
    body: '{"Message from node js app"}',
  },
};


const setMsg = (tokenDevice,body) => {
  msgtest.to = tokenDevice;
  msgtest.notification.body = body;

};

const sendNoti = () => {
  console.log(msgtest);
  fcm.send(msgtest, function (err, response) {
    console.log(msgtest.to);
    if (err) {
      console.log("____(fcmErr) Something has gone wrong!" + err);
      console.log("____(fcmErr) Respponse:! " + response);
    } else {
      // showToast("Successfully sent with response");
      console.log("_____(fcm) Successfully sent with response: ", response);
    }
  });
};

module.exports = {
  sendNoti,
  setMsg,
};
