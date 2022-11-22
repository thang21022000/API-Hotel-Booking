import axios from 'axios';
import {format} from 'date-fns';
import Order from '../modules/Order.js';

export const createPaymentMomo = async (req, res, next) => {
    try {
        const {data} = await axios.post("https://test-payment.momo.vn/v2/gateway/api/create", req.body, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        res.status(200).json(data)
    } catch(err) {
        console.log(err);
    }
}

export const createPaymentVNPay = (req, res, next) => {
    var ipAddr = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

    var tmnCode = "UBS0Q4A7"
    var secretKey = "NMECCMIEWMBYTWRTRYFXSXHXHKXUIXVC"
    var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html"
    var returnUrl = "http://localhost:8800/api/payment/vnpaypayment/vnpay_return"

    var date = new Date();

    var createDate = format(date, 'yyyyMMddHHmmss');
    var bankCode = "NCB";

    var orderType = "other";
    var locale = "vn";
    if(locale === null || locale === ''){
        locale = 'vn';
    }
    var currCode = 'VND';
    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = req.body.vnp_TxnRef;
    vnp_Params['vnp_OrderInfo'] = req.body.vnp_OrderInfo;
    vnp_Params['vnp_OrderType'] = orderType;
    vnp_Params['vnp_Amount'] = req.body.vnp_Amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    if(bankCode !== null && bankCode !== ''){
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    // vnp_Params = sortObject(vnp_Params);
    vnp_Params = sortObject(vnp_Params);

    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");     
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    res.status(200).json(vnpUrl);
}

export const checkAndUpdate = async (req, res, err) => {
    var vnp_Params = req.query;

    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    var tmnCode = "UBS0Q4A7"
    var secretKey = "NMECCMIEWMBYTWRTRYFXSXHXHKXUIXVC"

    var querystring = require('qs');
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");     
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     

    if(secureHash === signed){
        try{
           await Order.findByIdAndUpdate(vnp_Params.vnp_OrderInfo,{$set : {status : "paid"}})
        }catch(err){
            console.log(err)
        }
        res.redirect("http://localhost:3000/account");

    } else{
        try{
            await Order.findByIdAndUpdate(vnp_Params.vnp_OrderInfo,{$set : {status : "wrong"}})
        }catch(err){
            console.log(err)
        }
        res.redirect("http://localhost:3000/account");    }
}

function sortObject(obj) {
	var sorted = {};
	var str = [];
	var key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}