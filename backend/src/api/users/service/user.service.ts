import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { Logger as NestLogger } from '@nestjs/common/services/logger.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserRoleEnum } from '../../../shared/enums/global/global-enum';
import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { UserErrorEnum } from '../enums/user.enum';

@Injectable()
export class UserService {
    public logger = new NestLogger(UserService.name);

    public userRoleEnum = UserRoleEnum;
    public userErrorEnum = UserErrorEnum;

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    public async createUser(userData: UserDto): Promise<User> {
        try {
            const user = await this.usersRepository.findOne({
                where: { email: userData.email },
            });

            const username = await this.usersRepository.findOne({
                where: { username: userData.username },
            });

            if (user || username) {
                this.logger.debug(`${this.userErrorEnum.USER_EXISTS}`);
                throw new ConflictException(this.userErrorEnum.USER_EXISTS);
            }

            const newUser = await this.usersRepository.create(userData);

            await this.usersRepository.save(newUser);
            return newUser;
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(error);
        }
    }

    /**
     * get an object array of all users
     * @function findAll()
     *
     * */
    public async findAll(): Promise<User[]> {
        try {
            const users = await this.usersRepository.find();

            if (Array.isArray(users) && !users.length) {
                this.logger.warn('User Database Is Empty');
                return users;
            }

            return users;
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(error);
        }
    }

    public async findOneById(id: string): Promise<User> {
        try {
            const user = await this.usersRepository.findOne({ id: id });

            if (!user) {
                this.logger.error(
                    `${this.userErrorEnum.USER_NO_ID_FOUND} ${id}`,
                    '',
                    UserService.name,
                );
                throw new NotFoundException(
                    `${this.userErrorEnum.USER_NO_ID_FOUND} ${id}`,
                );
            }

            return user;
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException(error);
        }
    }
    // TODO Move to Admin Section
    // public async delete(id: string): Promise<void> {
    //     const user = await this.usersRepository.softDelete(id);
    //
    //     if (!user) {
    //         this.logger.error(
    //             `${this.userErrorEnum.USER_NO_ID_FOUND} ${id}`,
    //             '',
    //             UserService.name,
    //         );
    //         throw new NotFoundException(
    //             `${this.userErrorEnum.USER_NO_ID_FOUND} ${id}`,
    //         );
    //     }
    // }
}
