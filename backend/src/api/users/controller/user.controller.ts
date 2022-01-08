import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Param,
    Post,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';

import { UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../service/user.service';
@UseInterceptors(ClassSerializerInterceptor)
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
