import {Currency} from "entities/currency";
import {Country} from "entities/Country";

export type Profile = {
    first?: string,
    lastname?: string,
    age?: number,
    currency?: Currency,
    country?: Country,
    city?: string,
    username?: string,
    avatar?: string
}

export type ProfileSchema = {
    data?: Profile
    form?: Profile
    isLoading: boolean
    error?: string
    readonly: boolean
}
