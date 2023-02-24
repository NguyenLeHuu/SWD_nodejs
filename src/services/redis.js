const redis = require("redis");
const util = require("util");


const client = redis.createClient({
  url: 'redis://default:orU66A7C0z9Y8EsgZNvRPxSzRFa6SlVC@redis-13393.c295.ap-southeast-1-1.ec2.cloud.redislabs.com:13393'
});
client.connect()


// client.set = util.promisify(client.set);
// client.get = util.promisify(client.get);

const clientSet = (key, value) => {
    client.set(key, value).then(()=>{
      console.log("____(redis) set done");
    }); 
};

const clientGet = async(key) => {
  console.log("____chay zo get redis");
  await client.get(key).then((value)=>{
    console.log("_______"+value);
    return value
  })
};

module.exports = {
  clientSet,
  clientGet,
};
