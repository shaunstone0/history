import { Injectable, NotFoundException } from '@nestjs/common';
import { Logger as NestLogger } from '@nestjs/common/services/logger.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../models/user/user.entity';
import { UserRoleEnum } from '../shared/enums/global/global-enum';
import { UserDto } from './dto/user.dto';
import { UserErrorEnum } from './enums/user.enum';
import { UserHelperService } from './helpers/user-helper/user-helper.service';

@Injectable()
export class UserService {
    public logger = new NestLogger(UserService.name);

    public userRoleEnum = UserRoleEnum;
    public userErrorEnum = UserErrorEnum;

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private userHelperService: UserHelperService,
    ) {}

    public async createUser(userData: UserDto): Promise<User> {
        // While creating a user, we set the role.
        // TODO: This could be set frontend.
        const newUserData = await this.userHelperService.addUserRole(
            userData,
            this.userRoleEnum.USER_ROLE_USER,
        );

        const newUser = await this.usersRepository.create(newUserData);

        await this.usersRepository.save(newUser);

        return newUser;
    }

    /**
     * get an object array of all users
     * @function findAll()
     *
     * */
    public async findAll(): Promise<User[]> {
        const users = await this.usersRepository.find();

        if (Array.isArray(users) && !users.length) {
            this.logger.warn('User Database Is Empty');
            return users;
        }
        return users;
    }

    public async findOneById(id: string): Promise<User> {
        const user = await this.usersRepository.findOne({ id: id });

        if (!user) {
            this.logger.error(`${this.userErrorEnum.USER_NO_ID_FOUND} ${id}`);
            throw new NotFoundException(
                `${this.userErrorEnum.USER_NO_ID_FOUND} ${id}`,
            );
        }

        return user;
    }

    public async delete(id: string): Promise<void> {
        const user = await this.usersRepository.softDelete(id);

        if (!user) {
            this.logger.error(`${this.userErrorEnum.USER_NO_ID_FOUND} ${id}`);
            throw new NotFoundException(`${this.userErrorEnum.USER_NO_ID_FOUND} ${id}`);
        }
    }
}
