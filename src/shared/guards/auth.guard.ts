import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { verify } from 'azure-ad-jwt-v2';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor() { }

    public async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const jwtToken = this.extractTokenFromHeader(request);
        if (!jwtToken) {
            throw new UnauthorizedException();
        }
        try {
            return await this.isValidToken(jwtToken);
        } catch {
            throw new UnauthorizedException();
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    private isValidToken(jwtToken: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            verify(jwtToken, null, (err, result) => {
                if (err || !result) reject(false);
                resolve(true);
            });
        });
    }
}