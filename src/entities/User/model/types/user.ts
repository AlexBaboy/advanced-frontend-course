import { UserRole } from '@/entities/User/model/constants/constants';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { JsonSettings } from '@/entities/User/model/types/jsonSettings';

export type User = {
    id: string;
    username: string;
    avatar?: string;
    roles?: UserRole[];
    features?: FeatureFlags;
    jsonSettings?: JsonSettings;
};

export type UserSchema = {
    authData?: User;
    _inited?: boolean;
};
