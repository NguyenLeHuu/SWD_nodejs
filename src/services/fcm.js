var FCM = require("fcm-node");
var serverKey =
  "AAAA7LqdmJY:APA91bFo9Thjb0kCmcN8I8S29QBpaA9KHfJ37JOxMD-FHVzenM5c2PvHetMC_Xs86iCzEI-dQAcmeDjagbxD195-7_lsBN2Oc43pzhrbG-TQBrlTMzKd1BFKoSHSwuHKIK2X81gaNiIh";
var fcm = new FCM(serverKey);
const topic = 'uiCha_topic';

//form msg gui tung thiet bi
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

//form msg gui theo topic
const messageTopic = {
  data: {
    score: '850',
    time: '2:45'
  },
  topic: topic
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

// These registration tokens come from the client FCM SDKs.
// const registrationTokens = [
//   'cpXJrSNS66qYBZ2Kc2svrc:APA91bFjXfGYnjQ0XG8DM9a7hfd5neOrcSr5zKtU-Kos8jQh8gzoRgFAAzcnN_iDzhRIy1QSKOtqMu98vGeWYvwFHv7-Yc3pyUaEMs0eVOH91EUqbBO1ss_ftExPDFoDRV3wmNVfzvvF',
//   // ...
//   'eowymDzjzrDw-YfpzdJgJs:APA91bFpIgAosp6Z3SgHZr59sr2Juo9uJanEE7WtSw7Chp-bgNFcGyefVETfYJ1fuKhTDcmDmdtYd8TuyeALS_MkfIIyC-FU4q5gRfZCF6YHWkdfASqiE1Oul1NsS5GSFh8-hu0n545G',
//   'dDFBkCogmcYmxIHaOMhzq_:APA91bFT4eUGoC7TtJRLh83_JpZGGxtxC46DwK1N1HcAbxQ8FeFl9TYsGQ1AzQRJnLay_ianC7NsCZdtjNfDn_7AQt0U29JClNSeQXmWu3XYz7emNKFoCjO1CFvMLO2lEPI-Y6U3Ehlr',
// ];

// // Unsubscribe the devices corresponding to the registration tokens from
// // the topic.
// fcm.subscribeToTopic(registrationTokens, topic,(req, res)=>{
//   console.log(res);
// })
//   .then((response) => {
//     // See the MessagingTopicManagementResponse reference documentation
//     // for the contents of response.
//     console.log('Successfully subscribed from topic:', response);
//   })
//   .catch((error) => {
//     console.log('Error subscribing from topic:', error);
//   });

module.exports = {
  sendNoti,
  setMsg,
};
