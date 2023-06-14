import { EnvVariableConfig } from '../models/config/env-variable-config.model';

export default (): EnvVariableConfig => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        host: process.env.DATABASE_HOST,
        dbName: process.env.DATABASE_NAME
    },
    smtp: {
        host: process.env.EMAIL_HOST,
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PWD
    }
});