import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthDto {
    @IsString()
    @IsEmail()
    @ApiProperty({ description: 'Email of the User' })
    public email: string;

    @IsString()
    @ApiProperty({ description: 'Password of the User' })
    public password: string;
}
