var FCM = require("fcm-node");
var serverKey =
  "AAAA7LqdmJY:APA91bFo9Thjb0kCmcN8I8S29QBpaA9KHfJ37JOxMD-FHVzenM5c2PvHetMC_Xs86iCzEI-dQAcmeDjagbxD195-7_lsBN2Oc43pzhrbG-TQBrlTMzKd1BFKoSHSwuHKIK2X81gaNiIh";
var fcm = new FCM(serverKey);

var message = {
  to: "dRTU9c4M0DnNMlUW0loNUW:APA91bFJZosPZ95efnMtZzlKP89eKTRytcy9S-rZUw34Qrc_CSHMsrsAiw7NEB-XS8cq9JHR_CHAx5L7aqABZQn8p59vPWW_PY7rQQRDdGB21I91FRf_M3uBpabAC1r5DSlDRq2yVo0w",
  notification: {
    title: "NotifcatioTestAPP",
    body: '{"Message from node js app"}',
  },

  data: {
    //you can send only notification or only data(or include both)
    title: "ok cdfsdsdfsd",
    body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}',
  },
};

fcm.send(message, function (err, response) {
  // console.log(message.to);
  if (err) {
    console.log("Something has gone wrong!" + err);
    console.log("Respponse:! " + response);
  } else {
    // showToast("Successfully sent with response");
    console.log("Successfully sent with response: ", response);
  }
});

