import { IsString, Length } from 'class-validator';

export class UserDto {
    @IsString()
    @Length(1, 50)
    public username: string;

    @IsString()
    @Length(1, 50)
    public password: string;

    public role: string;
}
