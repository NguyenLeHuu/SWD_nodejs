
const admin = require("firebase-admin");
const { v4: uuidv4 } = require('uuid');

const FCM = require("fcm-node");
var serverKey =
  "AAAA7LqdmJY:APA91bFo9Thjb0kCmcN8I8S29QBpaA9KHfJ37JOxMD-FHVzenM5c2PvHetMC_Xs86iCzEI-dQAcmeDjagbxD195-7_lsBN2Oc43pzhrbG-TQBrlTMzKd1BFKoSHSwuHKIK2X81gaNiIh";
var fcm = new FCM(serverKey);

const serviceAccount = require("../config/firebase-sdk.json");

const BUCKET ="prmflowershop.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET
});

const bucket =  admin.storage().bucket();

const uploadImage =  (image) =>{

    return new Promise( async(resolve,reject)=>{
        try {
            const filename = uuidv4();
            const file = bucket.file(filename);
        
            const stream = file.createWriteStream({
                metadata:{
                    contentType: image.mimetype,
                },
            });
        
            stream.on("error",(e) =>{
                console.log(e);
            })
        
            stream.on("finish", async()=>{
                await file.makePublic();

                
            })
        
            stream.end(image.buffer);
            resolve(`https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${filename}?alt=media`);
            
        }catch (e){
            console.log(e);
            reject(e);
        }
    })
}

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


module.exports = {
    uploadImage,
    sendNoti,
  setMsg,

};
