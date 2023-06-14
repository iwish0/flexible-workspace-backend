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
    host: string;
    user: string;
    pass: string;
}