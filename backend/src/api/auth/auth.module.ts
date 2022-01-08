import { Logger as NestLogger, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PasswordUtilsModule } from '../../shared/utils/password-utils/password-utils.module';
import { PasswordUtilsService } from '../../shared/utils/password-utils/password-utils.service';
import { User } from '../users/entities/user.entity';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PasswordUtilsModule,
        NestConfigModule,
    ],
    providers: [AuthService, NestLogger, PasswordUtilsService],
    controllers: [AuthController],
})
export class AuthModule {}
