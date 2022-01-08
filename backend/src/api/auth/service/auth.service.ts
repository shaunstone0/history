import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { Logger as NestLogger } from '@nestjs/common/services/logger.service';
import { ConfigService as NestConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';

import { PasswordUtilsService } from '../../../shared/utils/password-utils/password-utils.service';
import { UserDto } from '../../users/dto/user.dto';
import { User } from '../../users/entities/user.entity';
import { UserErrorEnum } from '../../users/enums/user.enum';
import { AuthDto } from '../dto/auth.dto';
import { AuthErrorEnum } from '../enum/auth.enum';

@Injectable()
export class AuthService {
    public logger = new NestLogger(AuthService.name);

    private userErrorEnum = UserErrorEnum;
    private authErrorEnum = AuthErrorEnum;

    private sessionUser = {};
    private isPasswordVerified: boolean;

    private sessionCookieName = this.nestConfigService.get<string>('SESS_NAME');

    private userInfo: AuthDto;
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private passwordUtilsService: PasswordUtilsService,
        private nestConfigService: NestConfigService,
    ) {}

    public async registerUser(userData: UserDto): Promise<User> {
        const existingUser = await this.userRepository.find({
            where: [{ email: userData.email }, { username: userData.username }],
        });

        if (existingUser.length >= 1) {
            throw new ConflictException(this.userErrorEnum.USER_EXISTS);
        }

        const user = await this.userRepository.create(userData);
        await this.userRepository.save(user);

        return user;
    }

    public async loginUser(
        userData: AuthDto,
        session: Record<string, any>,
    ): Promise<any> {
        const user = await this.userRepository.findOne({
            where: { email: userData.email },
        });

        if (user && userData) {
            this.isPasswordVerified =
                await this.passwordUtilsService.verifyUserPassword(
                    userData.password,
                    user,
                );
        }

        if (this.isPasswordVerified) {
            this.sessionUser = session.user = {
                id: user.id,
            };
        } else {
            throw new BadRequestException(this.userErrorEnum.BAD_REQUEST);
        }

        return this.sessionUser;
    }

    public verifySession(sessionUser): any {
        return sessionUser;
    }

    public logOutUser(request: Request, response: Response, session): void {
        const user = session.user;

        if (session.user) {
            request.session.destroy((error) => {
                response.clearCookie(this.sessionCookieName);
                if (user) {
                    response.send(user);
                } else {
                    this.logger.log(this.authErrorEnum.NOT_AUTHORIZED);
                    throw new ForbiddenException(
                        this.authErrorEnum.NOT_AUTHORIZED,
                    );
                }

                if (error) {
                    this.logger.error(this.userErrorEnum.BAD_REQUEST);
                    throw new BadRequestException(error);
                }
            });
        } else {
            this.logger.log(this.authErrorEnum.NO_SESSION);
            throw new BadRequestException(this.authErrorEnum.NO_SESSION);
        }
    }
}
