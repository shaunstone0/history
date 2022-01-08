import { Body, Controller, Get, Post, Req, Res, Session } from '@nestjs/common';
import { Request, Response } from 'express';

import { UserDto } from '../../users/dto/user.dto';
import { User } from '../../users/entities/user.entity';
import { AuthDto } from '../dto/auth.dto';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/register')
    public registerUser(@Body() userData: UserDto): Promise<User> {
        return this.authService.registerUser(userData);
    }

    @Post('login')
    public loginUser(
        @Body() userData: AuthDto,
        @Session() session: Record<string, any>,
    ): Promise<AuthDto> {
        return this.authService.loginUser(userData, session);
    }

    @Get('session')
    public verifySession(
        @Session() session: Record<string, any>,
    ): Promise<any> {
        return this.authService.verifySession(session.user);
    }

    @Post('logout')
    public async logoutUser(
        @Req() request: Request,
        @Res() response: Response,
        @Session() session: Record<string, any>,
    ): Promise<void> {
        return this.authService.logOutUser(request, response, session);
    }
}
