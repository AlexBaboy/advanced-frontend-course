export {
    isUserAdmin,
    isUserManager,
} from '@/entities/User/model/selectors/getUserRoles/getUserRoles';

export { userReducer, userActions } from './model/slice/userSlice';
export { getUserInited } from './model/selectors/getUserInited/getUserInited';
export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';

export type { UserSchema, User } from './model/types/user';
export { UserRole } from '@/entities/User/model/constants/constants';

export { getJsonSettings } from './model/selectors/getJsonSettings/getJsonSettings';
export { useJsonSettings } from '@/entities/User/model/selectors/getJsonSettings/getJsonSettings';

export { saveJsonSettings } from '@/entities/User/model/services/saveJsonSettings';

export { initAuthData } from '@/entities/User/model/services/initAuthData';
