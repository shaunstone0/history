import { Injectable } from '@nestjs/common';

import { UserDto } from '../../dto/user.dto';

@Injectable()
export class UserHelperService {
    public addUserRole(userData: UserDto, role: string): UserDto {
        let userDataWithRole;
        if (!userData.role) {
            userDataWithRole = {
                ...userData,
                role: role,
            };
        }
        return userDataWithRole;
    }
}
