export {
    isUserAdmin,
    isUserManager,
} from 'entities/User/model/selectors/getUserRoles/getUserRoles';

export {
    userReducer,
    userActions,
} from './model/slice/userSlice';

export {
    getUserInited,
} from './model/selectors/getUserInited/getUserInited';

export {
    UserSchema,
    User,
    UserRole,
} from './model/types/user'

export {
    getUserAuthData,
} from './model/selectors/getUserAuthData/getUserAuthData'
