"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.AWS_SECRET_KEY = exports.AWS_PUBLIC_KEY = exports.AWS_BUCKET_REGION = exports.AWS_BUCKET_NAME = exports.WORKSPACE_URL = exports.PAYPAL_API_SECRET = exports.PAYPAL_API_CLIENT = exports.PAYPAL_API = exports.API_URI = exports.PORT = exports.HOST = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.HOST = process.env.HOST;
exports.PORT = process.env.PORT || 9000;
exports.API_URI = process.env.API_URI;
exports.PAYPAL_API = process.env.PAYPAL_API;
exports.PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT;
exports.PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET;
exports.WORKSPACE_URL = process.env.WORKSPACE_URL;
exports.AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
exports.AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
exports.AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY;
exports.AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
exports.JWT_SECRET = process.env.JWT_SECRET;
