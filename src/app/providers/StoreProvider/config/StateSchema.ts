import {UserSchema} from "entities/User";
import {LoginSchema} from "features/AuthByUserName";

export type StateSchema = {
    user?: UserSchema
    loginForm?: LoginSchema
}
