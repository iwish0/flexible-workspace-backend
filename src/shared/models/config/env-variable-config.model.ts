export type EnvVariableConfig = {
    port: number;
    database: DataBaseEnvVariable;
    smtp: SmtpEnvVariable;
}

export type DataBaseEnvVariable = {
    host: string;
    dbName: string;
}

export type SmtpEnvVariable = {
    emailSenderAdress: string;
    port: string;
    host: string;
    user: string;
    pass: string;
}