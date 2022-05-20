require("dotenv").config()
const stripe = require("stripe")("sk_test_51L0M5KSIxvgeJX8O89ivr4YqVGUQuqoRcReVEm1sIRE8D16B0gUvIpsgnTPWlzUFAlyntJhX7ixL9LJKHplzeYNa00i8j8bZlK")

const paymentCtrls = {
    checkoutSession: async (req, res) => {
            const {priceId, _id} = req.body;
            const customer = await stripe.customers.create({
              metadata:{
                userId:_id
              }
            })

            const session = await stripe.checkout.sessions.create({
                
                line_items: [
                    {
                      // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                      price: `${priceId}`,
                      quantity:1,
                    },
                  ],
                customer:customer.id,
                mode: 'subscription',
                success_url: `${process.env.CLIENT_URL}/eb/payment-success`,
                cancel_url: `${process.env.CLIENT_URL}/eb/payment-aborted`,
            });

            res.send({url:session.url});
    }
}

module.exports = paymentCtrls