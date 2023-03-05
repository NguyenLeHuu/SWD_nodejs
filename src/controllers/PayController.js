const paypal = require("paypal-rest-sdk");
const PayService = require("../services/PayService");

module.exports = {
  async pay(req, res) {
    /* 
            #swagger.tags = ['Payment']
             #swagger.description = "payment by paypal"
            */
    try {
      const payerId = req.query.PayerID;
      const paymentId = req.query.paymentId;

      const execute_payment_json = {
        payer_id: payerId,
        transactions: [
          {
            amount: {
              currency: "USD",
              total: "25.00",
            },
          },
        ],
      };
      paypal.payment.execute(
        paymentId,
        execute_payment_json,
        function (error, payment) {
          if (error) {
            console.log(error.response);
            throw error;
          } else {
            console.log(JSON.stringify(payment));
            //set lai cart
            //chuyen status bang ordercarts
            //luu db
            res.send("Success (Mua hàng thành công)");
          }
        }
      );
    } catch (error) {
      console.log("____(pay) err");
    }
  },
};
