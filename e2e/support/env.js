const path = require("path");
const dotenv = require("dotenv");

const env = process.env.NODE_ENV || "local";

const envPath = path.resolve(__dirname, `../../config/.env.${env}`);
dotenv.config({ path: envPath });
