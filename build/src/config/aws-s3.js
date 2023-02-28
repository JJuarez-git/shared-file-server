"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWS_S3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const config_1 = require("./config");
const AWS_S3 = new client_s3_1.S3Client({
    region: config_1.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: config_1.AWS_PUBLIC_KEY,
        secretAccessKey: config_1.AWS_SECRET_KEY
    }
});
exports.AWS_S3 = AWS_S3;
