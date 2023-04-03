import express from 'express'
import asyncHandler from 'express-async-handler'

const createPayment = asyncHandler(async (req, res) => {
    const {order} = req.body.order
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost/paypal",
            "cancel_url": "http://localhost/paypal/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [order]
            },
            "amount": {
                "currency": "USD",
                "total": order.total
            },
            "description": "This is the payment description."
        }]
    };
    
    
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
        }
    });
})



export {
    createPayment,
}