const paypal = require("paypal-rest-sdk");
const PayService = require("../services/PayService");

module.exports = {
  async create_pay(req, res) {
    /* 
            #swagger.tags = ['Payment']
             #swagger.description = "payment by paypal"
            */
    try {
      const items_cart = req.body.items_cart;
      const total = req.body.total;
      const idorder = req.body.idorder;
      let idpayment = await PayService.createPayment(idorder,total)
      

      const create_payment_json = {
        intent: "sale",
        payer: {
          payment_method: "paypal",
        },
        redirect_urls: {
          // return_url: `http://localhost:8080/success/?idpayment=${idpayment.idpayment}&idorder=${idorder}`,
          // cancel_url: "http://localhost:8080/cancel",
          return_url: "https://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:8080/success",
          cancel_url: "https://ec2-3-0-97-134.ap-southeast-1.compute.amazonaws.com:8080/cancel",
        },
        transactions: [
          {
            // item_list: {
            //   items: [
            //     {
            //       name: "Iphone 4S",//
            //       sku: "001",
            //       price: "25.00",//
            //       currency: "USD",
            //       quantity: 1,//
            //     },
            //     {
            //       name: "Iphone 5S",//
            //       sku: "002",
            //       price: "25.00",//
            //       currency: "USD",
            //       quantity: 1,//
            //     },
            //   ],
            // },
            item_list: {
              items: items_cart,
            },
            amount: {
              currency: "USD",
              total: total.toString(),
            },
            description: "paypal for Uicha",
          },
        ],
      };

      paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
          console.log(error);
        } else {
          for (let i = 0; i < payment.links.length; i++) {
            if (payment.links[i].rel === "approval_url") {
              console.log(payment.links[i].href);
              res.redirect(payment.links[i].href);
            }
          }
        }
      });
    } catch (error) {
      console.log("______(createpay) err");
    }
  },
};
