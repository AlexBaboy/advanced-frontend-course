import {Profile, ValidateProfileError} from "entities/Profile";

export type ProfileSchema = {
    data?: Profile
    form?: Profile
    isLoading?: boolean
    error?: string
    readonly?: boolean
    validateErrors?: ValidateProfileError[]
}