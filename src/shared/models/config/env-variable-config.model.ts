export type EnvVariableConfig = {
    port: number;
    database: DataBaseEnvVariable;
    smtp: SmtpEnvVariable;
    clientCredentials: clientCredentialsEnvVariable;
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

export type clientCredentialsEnvVariable = {
    tenantId: string;
    clientId: string;
    clientSecret: string;
}