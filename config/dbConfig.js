import dotenv from 'dotenv';
dotenv.config();

export default {
    devDbServer: process.env.DEV_DB_SERVER,
    devDbUser: process.env.DEV_DB_USER,
    devDbPw: process.env.DEV_DB_PW,
    devDbPort: process.env.DEV_DB_PORT,
    devDb: process.env.DEV_DB_NAME
};
