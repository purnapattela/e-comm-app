import dotenv from 'dotenv';

dotenv.config()

const conf = {
    MONGODB_URL : process.env.MONGODB_URL,
    PORT : process.env.PORT
}

export default conf