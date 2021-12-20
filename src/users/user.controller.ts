import {Body, Controller, Get, Param, Post} from '@nestjs/common';

import { User } from '../models/user/user.entity';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    public findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get('/:id')
    public findUserById(@Param('id') id: string): Promise<User> {
        return this.userService.findOneById(id);
    }

    @Post('/create')
    public createUser(@Body() userData: UserDto): Promise<User> {
        return this.userService.createUser(userData);
    }
}
