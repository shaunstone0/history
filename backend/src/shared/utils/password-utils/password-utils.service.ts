import { Injectable } from '@nestjs/common';
import { Logger as NestLogger } from '@nestjs/common/services/logger.service';
import { ConfigService as NestConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

import { UserDto } from '../../../api/users/dto/user.dto';

@Injectable()
export class PasswordUtilsService {
    public logger = new NestLogger(PasswordUtilsService.name);

    private iterations: number;
    private hashedPassword: string;

    constructor(private nestConfigService: NestConfigService) {}

    public async hashPassword(password: string, salt: string): Promise<string> {
        await this.getEnvironmentVariables();
        if (password && salt) {
            this.hashedPassword = crypto
                .pbkdf2Sync(password, salt, 2048, 32, 'sha512')
                .toString('hex');
        }
        return this.hashedPassword;
    }

    public async verifyUserPassword(
        enteredPassword: string,
        user: UserDto,
    ): Promise<boolean> {
        const userSalt = await this.getSaltFromPassword(user.password);
        const enteredHashedPassword = await this.hashPassword(
            enteredPassword,
            userSalt,
        );

        const userPassword = user.password.split('$')[1];

        return enteredHashedPassword === userPassword;
    }

    public async getSaltFromPassword(userPassword: string): Promise<string> {
        return userPassword.split('$')[0];
    }

    public getEnvironmentVariables(): void {
        this.iterations = Number(
            this.nestConfigService.get<string>('PASSWORD_ITERATIONS'),
        );
    }
}
