import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const config = {
    stock_db: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'coderhouse',
            password: 'coderhouse',
            database: 'ecommerce'
        }
    },
    chat_db : {
        client: 'better-sqlite3',
        connection: {
            filename: path.join(__dirname, '../../DB/ecommerce.db3')
        },
        useNullAsDefault: true
    },
    axios : {
        baseUrl: 'http://localhost:8080'
    },
    mongo_db: {
        secret_key: "1234567",
        url: "mongodb+srv://db_usr:db_usr@cluster0.6bkwn.mongodb.net/coder",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        }
    }
}
