import { Injectable, NotFoundException } from '@nestjs/common';
import { Logger as NestLogger } from '@nestjs/common/services/logger.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../models/user/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    public logger = new NestLogger(UserService.name);

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    public async createUser(userData: UserDto): Promise<User> {
        const newUser = await this.usersRepository.create(userData);
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
            this.logger.error(`No user was found with id of ${id}`);
            throw new NotFoundException(`No user was found with id of ${id}`);
        }

        return user;
    }

    public async delete(id: string): Promise<void> {
        const user = await this.usersRepository.softDelete(id);

        if (!user) {
            this.logger.error(`No user was found with the id of ${id}`);
            throw new NotFoundException(`No user was found with id of ${id}`);
        }
    }
}
