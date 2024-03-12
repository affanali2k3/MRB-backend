import { Resend } from "resend";
import * as dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const resend = new Resend(process.env.RESEND_API_KEY);

export default resend;
