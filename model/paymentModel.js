const mongoose = require('mongoose')

const PaymentDetailsSchema = new mongoose.Schema(
    {
        user_id: {
            type:String,
        },
        customer_id: {
            type: String,
        },
        subscription_id: {
            type: String,
        },
        invoice_id: {
            type: String,
        },
        customer_email:{
            type:String,
        },
        customer_name:{
            type:String,
        },
        plan:[{
            plan_type:{
                type:String
            },
            plan_amount:{
                type:Number
            },
            currency:{
                type:String
            },
            plan_purchased:{
                type:Number
            },
            plan_expries:{
                type:Number
            },
            plan_status:{
                type:Boolean
            }
        }],
        payment:[{
            payment_method_type:{
                type:String
            },
            payment_method_brand:{
                type:String
            },
            payment_method_last_digits:{
                type:Number
            }
        }]
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model("PaymentDetails", PaymentDetailsSchema)