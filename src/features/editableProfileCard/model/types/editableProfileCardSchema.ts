import { Profile } from '@/entities/Profile';
import { ValidateProfileError } from '@/features/editableProfileCard/model/constants/constants';

export type ProfileSchema = {
    data?: Profile
    form?: Profile
    isLoading?: boolean
    error?: string
    readonly?: boolean
    validateErrors?: ValidateProfileError[]
}
