import { AuthProviderService } from './auth-provider.service';
import { Module } from '@nestjs/common';

@Module({
    providers: [AuthProviderService],
    exports: [AuthProviderService]
})
export class AuthProviderModule { }
