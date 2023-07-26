import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
import { clientCredentialsEnvVariable } from 'src/shared/models/config/env-variable-config.model';
import { MS_GRAPH_DEFAULT } from 'src/shared/constants/scope.constant';
import { CLIENT_CREDENTIALS } from 'src/shared/constants/config.constant';
import { ClientSecretCredential, } from '@azure/identity';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthProviderService {

    constructor(private readonly config: ConfigService) { }

    private getClientSecretCredential(): ClientSecretCredential {
        const { tenantId, clientId, clientSecret } = this.config.get<clientCredentialsEnvVariable>(CLIENT_CREDENTIALS);
        return new ClientSecretCredential(tenantId, clientId, clientSecret);
    }

    public getAuthProviderClientSecretCredential(): TokenCredentialAuthenticationProvider {
        const credential: ClientSecretCredential = this.getClientSecretCredential();
        return new TokenCredentialAuthenticationProvider(credential, { scopes: [MS_GRAPH_DEFAULT] });
    }
}