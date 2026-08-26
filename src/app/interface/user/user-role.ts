import { UserRolesForms } from './user-roles-forms';

export interface UserRoles {
    id: string;
    code: string;
    sequence: number;
    name: string;
    description: string;
    userroleform?: UserRolesForms[];
}
