import {lazy} from "react";
import {LoginFormProps} from "./LoginForm";

// @ts-ignore
export const LoginFormAsync = lazy<FC<LoginFormProps>>( ()=> import('./LoginForm'))
