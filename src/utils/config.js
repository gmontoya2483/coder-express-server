/* ------------------- Env Variables ------------------- */
import dotenv from 'dotenv';
import minimist from 'minimist';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const options = {alias: {port: 'p', mode: 'm'}, default: {port: 8080, mode: 'FORK'}};
const args = minimist(process.argv.slice(2), options);
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const config = {
    server: {
        port: process.env.PORT || args.port,
        mode: args.mode
    },
    stock_db: {
        client: 'mysql',
        connection: {
            host: process.env.CODER_STOCK_DB_HOST,
            user: process.env.CODER_STOCK_DB_USER,
            password: process.env.CODER_STOCK_DB_PASSWORD,
            database: process.env.CODER_STOCK_DB_DATABASE
        }
    },
    chat_db : {
        client: 'better-sqlite3',
        connection: {
            filename: path.join(__dirname, process.env.CODER_CHAT_DB_FILENAME)
        },
        useNullAsDefault: true
    },
    axios : {
        baseUrl: `https://gmontoya-coder.herokuapp.com:${process.env.PORT || args.port}`
    },
    mongo_db: {
        secret_key: process.env.CODER_MONGO_DB_SECRET,
        url: process.env.CODER_MONGO_DB_URL,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        }
    }
}
