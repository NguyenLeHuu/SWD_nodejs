const paypal = require("paypal-rest-sdk");
const Firebase = require("../services/Firebase");

const PayService = require("../services/PayService");
const OrderService = require("../services/OrderService");
const OrderDetailService = require("../services/OrderDetailService");

module.exports = {
  async pay(req, res) {
    /* 
            #swagger.tags = ['Payment']
             #swagger.description = "payment by paypal"
            */
    try {
      const payerId = req.query.PayerID;
      const paymentId = req.query.paymentId;
      const idpayment = req.query.idpayment;
      const idorder = req.query.idorder;

      const total = await PayService.getPayment(idpayment);
      const execute_payment_json = {
        payer_id: payerId,
        transactions: [
          {
            amount: {
              currency: "USD",
              total: total,
            },
          },
        ],
      };
      paypal.payment.execute(
        paymentId,
        execute_payment_json,
        async function (error, payment) {
          if (error) {
            console.log(error.response);
            throw error;
          } else {
            console.log(JSON.stringify(payment));
            //set lai cart
            //chuyen status bang ordercarts

            await PayService.updatePayment(idpayment);
            await OrderService.updateOrderStatus(idorder);
            // const orderDetail = await OrderDetailService.getOrderCartDetail(idorder)
            // await OrderDetailService.updateOrderDetail(orderDetail.idorderdetail)
            await OrderDetailService.updateOrderTracking(idorder, "Completed");
            const tokenDeviceMobile =
              "cg9vLKO8RFaMBsW9LxELkB:APA91bFF0PM8MZOFQ_MQ4tcrEC7c6pNIRQ9s4JM7O388T75wfa5gEHDX8Il9MV7Bw79qh_MrcIJiWZ_grOcXwZ2O14SfRQMyCPDyNllJ_bNOevcig1hdh4ZvgcTBWEIIiaMNX0CQmLV0";
            Firebase.setMsg(tokenDeviceMobile, "Bạn có 1 đơn đặt hàng mới!");
            Firebase.sendNoti();
            res.send("Success (Mua hàng thành công)");
          }
        }
      );
    } catch (error) {
      console.log("____(pay) err");
    }
  },
};
