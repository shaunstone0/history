import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class UserDto {
    @IsString()
    @IsEmail()
    @ApiProperty({ description: 'Email chosen by user' })
    public email: string;

    @IsString()
    @Length(1, 50)
    @ApiProperty({ description: 'Username chosen by user' })
    public username: string;

    @IsString()
    @Length(1, 200)
    @ApiProperty({ description: 'Hashed' })
    public password: string;

    @ApiProperty({
        required: false,
        description: 'Set in the backend currently on user creation',
    })
    public role: string;
}
