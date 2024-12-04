import { UserRole } from '@/entities/User/model/constants/constants';
import { FeatureFlags } from '@/shared/types/featureFlags';

export type User = {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];
    features?: FeatureFlags;
};

export type UserSchema = {
    authData?: User;
    _inited?: boolean;
};
