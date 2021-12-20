import {Logger as NestLogger, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../models/user/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserHelperService } from './helpers/user-helper/user-helper.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService, NestLogger, UserHelperService],
    controllers: [UserController],
})
export class UserModule {}
