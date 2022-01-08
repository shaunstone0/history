import { InternalServerErrorException } from '@nestjs/common';
import { Logger as NestLogger } from '@nestjs/common/services/logger.service';
import * as crypto from 'crypto';
import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    LoadEvent,
} from 'typeorm';

import { UserRoleEnum } from '../../../shared/enums/global/global-enum';
import { User } from '../entities/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    private iterations = Number(process.env.PASSWORD_ITERATIONS);
    public logger = new NestLogger(UserSubscriber.name);
    public rolesEnum = UserRoleEnum;

    // eslint-disable-next-line @typescript-eslint/ban-types
    public listenTo(): Function | string {
        return User;
    }

    public async beforeInsert(event: InsertEvent<User>): Promise<any> {
        const { password, role } = event.entity;
        const salt = crypto.randomBytes(20).toString('hex');
        const hash = await this.hashPassword(password, salt);

        event.entity.password = [salt, hash].join('$');
        event.entity.role = this.rolesEnum.USER_ROLE_USER;
    }
    // Has to be here, because services are not injectable into EventSubscribers yet...
    public async hashPassword(password: string, salt: string): Promise<string> {
        try {
            const hashedPassword = crypto
                .pbkdf2Sync(password, salt, this.iterations, 32, 'sha512')
                .toString('hex');
            this.logger.debug('Hashing Password....');
            return hashedPassword;
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(error);
        }
    }
}
