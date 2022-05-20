const stripe = require('stripe');
const PaymentDetailsSchema = require('../model/paymentModel')

const endpointSecret = "whsec_uY6ylrh1SM3v8ssajLgaKrQcmBo3otZQ";

let charge_details, invoice_details, customer_details;

const stripeWebhookCtrls = {
    stripeWebhook: (request, response) => {
        const sig = request.headers['stripe-signature'];

        let event;

        try {
            event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
        } catch (err) {
            response.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        // Handle the event
        switch (event.type) {
            case 'charge.succeeded':
                const charge = event.data.object;
                charge_details = {
                    customer_name:charge.billing_details.name,
                    customer_email:charge.billing_details.email,
                    payment_method_type: charge.payment_method_details.type,
                    payment_method_brand: charge.payment_method_details.card.brand,
                    payment_method_last_digits: charge.payment_method_details.card.last4
                }
                // Then define and call a function to handle the event charge.succeeded
                break;
            case 'invoice.paid':
                const invoice = event.data.object;
                invoice_details = {
                    customer_id: invoice.customer,
                    subscription_id: invoice.subscription,
                    invoice_id: invoice.id,
                    plan: invoice.lines.data[0].plan.nickname,
                    amount: invoice.amount_paid,
                    currency: invoice.currency,
                    plan_purchased: invoice.lines.data[0].period.start,
                    plan_expries: invoice.lines.data[0].period.end,
                    plan_status: invoice.lines.data[0].plan.active,
                }
                // Then define and call a function to handle the event invoice.paid
                break;
            case 'customer.updated':
                const customerUpdatedObject = event.data.object;
                customer_details={
                    userId:customerUpdatedObject.metadata.userId,
                }
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        if(invoice_details && charge_details && customer_details ){
            updateDd()
        }
        response.status(200).json("Webhook Triggered")
    }
}

const updateDd =  async () => {
    const payload = new PaymentDetailsSchema({
        user_id:customer_details.userId,
        customer_id:invoice_details.customer_id,
        subscription_id:invoice_details.subscription_id,
        invoice_id:invoice_details.invoice_id,
        customer_email:charge_details.customer_email,
        customer_name:charge_details.customer_name,
        plan:[{
            plan_type:invoice_details.plan,
            plan_amount:invoice_details.amount,
            currency:invoice_details.currency,
            plan_purchased:invoice_details.plan_purchased,
            plan_expries:invoice_details.plan_expries,
            plan_status:invoice_details.plan_status,
        }],
        payment:[{
            payment_method_type:charge_details.payment_method_type,
            payment_method_brand:charge_details.payment_method_brand,
            payment_method_last_digits:charge_details.payment_method_last_digits
        }]
    })

    await payload.save();

    charge_details = ""
    invoice_details =""
    customer_details = ""
}


module.exports = stripeWebhookCtrls
