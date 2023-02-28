"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancel = exports.capture = exports.create = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config/config");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const generatePaypalToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");
    const { data } = yield axios_1.default.post(`${config_1.PAYPAL_API}/v1/oauth2/token`, params, {
        auth: { username: config_1.PAYPAL_API_CLIENT, password: config_1.PAYPAL_API_SECRET },
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });
    return data.access_token;
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { purchase_units } = req.body;
    try {
        const PayPalToken = yield generatePaypalToken();
        const order = {
            intent: "CAPTURE",
            purchase_units /* : [
                {
                    amount: {
                        currency_code: "EUR",
                        value: "35"
                    },
                    description: "CODE 149 Fabrik"
                }
            ] */,
            application_context: {
                brand_name: "The Night S.L.",
                landing_page: "LOGIN",
                user_action: "PAY_NOW",
                return_url: `${config_1.HOST}${config_1.API_URI}/orders/capture`,
                cancel_url: `${config_1.HOST}${config_1.API_URI}/orders/cancel`
            }
        };
        const { data } = yield axios_1.default.post(`${config_1.PAYPAL_API}/v2/checkout/orders`, order, {
            headers: { Authorization: `Bearer ${PayPalToken}` }
        });
        res.json(data);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong." });
    }
});
exports.create = create;
const capture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const PayPalToken = yield generatePaypalToken();
        const { token } = req.query;
        const { data } = yield axios_1.default.post(`${config_1.PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
            headers: { Authorization: `Bearer ${PayPalToken}` }
        });
        if (data) {
            yield prisma.orders.create({
                data: {
                    transaction_id: data.purchase_units[0].payments.captures[0].id,
                    payer_id: data.payer.payer_id,
                    email_address: data.payer.email_address,
                    given_name: data.payer.name.given_name,
                    surname: data.payer.name.surname,
                    country_code: data.payer.address.country_code,
                    amount: data.purchase_units[0].payments.captures[0].amount.value,
                    aditional_fee: "3",
                    currency: data.purchase_units[0].payments.captures[0].amount.currency_code,
                    create_time: data.purchase_units[0].payments.captures[0].create_time
                }
            });
            res.redirect('http://localhost:3000/home');
        }
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong." });
    }
});
exports.capture = capture;
const cancel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.redirect('http://localhost:3000/events');
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Something went wrong." });
    }
});
exports.cancel = cancel;
