import { UserForms } from './user-forms';
import { UserRoles } from './user-role';

export interface User {
    id: string;
    name: string;
    type: number;
    role: number;
    level: number;
    username: string;
    // employee?: IEmployee;
    userrole?: UserRoles;
    userforms?: UserForms[];
}
