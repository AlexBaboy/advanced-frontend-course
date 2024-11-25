import { UserRole } from '@/entities/User/model/constants/constants';

export type User = {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];
};

export type UserSchema = {
    authData?: User;
    _inited?: boolean;
};
