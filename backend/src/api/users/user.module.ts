import { Logger as NestLogger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PasswordUtilsModule } from '../../shared/utils/password-utils/password-utils.module';
import { PasswordUtilsService } from '../../shared/utils/password-utils/password-utils.service';
import { UserController } from './controller/user.controller';
import { User } from './entities/user.entity';
import { UserService } from './service/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User]), PasswordUtilsModule],
    providers: [UserService, NestLogger, PasswordUtilsService],
    controllers: [UserController],
})
export class UserModule {}
