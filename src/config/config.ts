import * as dotenv from 'dotenv';
dotenv.config()

export const HOST = process.env.HOST as string
export const PORT = process.env.PORT as string || 9000
export const API_URI = process.env.API_URI as string
export const PAYPAL_API = process.env.PAYPAL_API as string
export const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT as string
export const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET as string
export const WORKSPACE_URL = process.env.WORKSPACE_URL as string
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME as string
export const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION as string
export const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY as string
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY as string
