var FCM = require("fcm-node");
const fetch = require("node-fetch");
var serverKey =
  "AAAA7LqdmJY:APA91bFo9Thjb0kCmcN8I8S29QBpaA9KHfJ37JOxMD-FHVzenM5c2PvHetMC_Xs86iCzEI-dQAcmeDjagbxD195-7_lsBN2Oc43pzhrbG-TQBrlTMzKd1BFKoSHSwuHKIK2X81gaNiIh";
var fcm = new FCM(serverKey);
const topic = "uiCha_topic";

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

const msgtest = {
  to: "",
  notification: {
    title: "UiCha Company",
    body: '{"Message from node js app"}',
  },
};

const setMsg = (tokenDevice, body) => {
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
const registrationTokens = [
  "cpXJrSNS66qYBZ2Kc2svrc:APA91bFjXfGYnjQ0XG8DM9a7hfd5neOrcSr5zKtU-Kos8jQh8gzoRgFAAzcnN_iDzhRIy1QSKOtqMu98vGeWYvwFHv7-Yc3pyUaEMs0eVOH91EUqbBO1ss_ftExPDFoDRV3wmNVfzvvF",
  // ...
  "eowymDzjzrDw-YfpzdJgJs:APA91bFpIgAosp6Z3SgHZr59sr2Juo9uJanEE7WtSw7Chp-bgNFcGyefVETfYJ1fuKhTDcmDmdtYd8TuyeALS_MkfIIyC-FU4q5gRfZCF6YHWkdfASqiE1Oul1NsS5GSFh8-hu0n545G",
  "dDFBkCogmcYmxIHaOMhzq_:APA91bFT4eUGoC7TtJRLh83_JpZGGxtxC46DwK1N1HcAbxQ8FeFl9TYsGQ1AzQRJnLay_ianC7NsCZdtjNfDn_7AQt0U29JClNSeQXmWu3XYz7emNKFoCjO1CFvMLO2lEPI-Y6U3Ehlr",
];

//form msg gui theo topic
const messageTopic = {
  notification: {
    title: "UiCha Company",
    body: '{"Message from node js app to Topic"}',
  },
  topic: topic,
};

// Unsubscribe the devices corresponding to the registration tokens from
// the topic.

// try {
//   fcm.subscribeToTopic(registrationTokens, topic,(req, res)=>{
//     console.log(res);
//   })
//     .then((response) => {
//       // See the MessagingTopicManagementResponse reference documentation
//       // for the contents of response.
//       console.log('Successfully subscribed from topic:', response);
//     })
//     .catch((error) => {
//       console.log('Error subscribing from topic:', error);
//     });
// } catch (error) {
//   console.log();
// }

const sendNotiToToPic = () => {
  var notification = {
    notification: {
      title: "UiCha Company",
      text: "Message from node js app to Topic",
    },
  };

  var fcm_tokens = [
    "cpXJrSNS66qYBZ2Kc2svrc:APA91bFjXfGYnjQ0XG8DM9a7hfd5neOrcSr5zKtU-Kos8jQh8gzoRgFAAzcnN_iDzhRIy1QSKOtqMu98vGeWYvwFHv7-Yc3pyUaEMs0eVOH91EUqbBO1ss_ftExPDFoDRV3wmNVfzvvF",
    // ...
    "eowymDzjzrDw-YfpzdJgJs:APA91bFpIgAosp6Z3SgHZr59sr2Juo9uJanEE7WtSw7Chp-bgNFcGyefVETfYJ1fuKhTDcmDmdtYd8TuyeALS_MkfIIyC-FU4q5gRfZCF6YHWkdfASqiE1Oul1NsS5GSFh8-hu0n545G",
    "dDFBkCogmcYmxIHaOMhzq_:APA91bFT4eUGoC7TtJRLh83_JpZGGxtxC46DwK1N1HcAbxQ8FeFl9TYsGQ1AzQRJnLay_ianC7NsCZdtjNfDn_7AQt0U29JClNSeQXmWu3XYz7emNKFoCjO1CFvMLO2lEPI-Y6U3Ehlr",
    "cg9vLKO8RFaMBsW9LxELkB:APA91bFF0PM8MZOFQ_MQ4tcrEC7c6pNIRQ9s4JM7O388T75wfa5gEHDX8Il9MV7Bw79qh_MrcIJiWZ_grOcXwZ2O14SfRQMyCPDyNllJ_bNOevcig1hdh4ZvgcTBWEIIiaMNX0CQmLV0",
  ];

  var notification_body = {
    notification: notification,
    registration_ids: fcm_tokens,
  };

  fetch("https://fcm.googleapis.com/fcm/send", {
    method: "POST",
    headers: {
      Authorization:
        "key=" +
        "AAAA7LqdmJY:APA91bFo9Thjb0kCmcN8I8S29QBpaA9KHfJ37JOxMD-FHVzenM5c2PvHetMC_Xs86iCzEI-dQAcmeDjagbxD195-7_lsBN2Oc43pzhrbG-TQBrlTMzKd1BFKoSHSwuHKIK2X81gaNiIh",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notification_body),
  })
    .then((res) => {
      console.log(res);
      console.log("____________Notification send successfully");
    })
    .catch((err) => {
      console.log("____________(fcm) send fail!");
    });


//  self.addEventListener('push', function(event) {
//       event.waitUntil(
//           fetch("https://fcm.googleapis.com/fcm/send", {
//             method: "POST",
//             headers: {
//               Authorization:
//                 "key=" +
//                 "AAAA7LqdmJY:APA91bFo9Thjb0kCmcN8I8S29QBpaA9KHfJ37JOxMD-FHVzenM5c2PvHetMC_Xs86iCzEI-dQAcmeDjagbxD195-7_lsBN2Oc43pzhrbG-TQBrlTMzKd1BFKoSHSwuHKIK2X81gaNiIh",
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(notification_body),
//           }).then(function(response) {
               
//         return response.json().then(function(data) {
//                   console.log(data);
//                   var title = data.title;
//                   var body = data.message;
//                   var icon = data.image;
//                   var tag = 'temp-tag';
//                   var urlOpen = data.URL;

//                 return  self.registration.showNotification(title, {
//                       body: body,
//                       icon: icon,
//                       tag: tag
//                   })
//               });
//           })
//       );
//   });

};

module.exports = {
  sendNoti,
  setMsg,
  sendNotiToToPic
};
