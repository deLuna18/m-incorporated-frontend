import { UserForms } from './user-forms';
import { UserRoles } from './user-role';

export interface UserRolesForms {
    id: string;
    userrole?: UserRoles;
    userform?: UserForms;
}
