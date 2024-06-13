export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    MANAGER = 'MANAGER',
}

export type User = {
    id: string,
    username: string,
    avatar?: string
    roles?: UserRole[]
}

export type UserSchema = {
    authData?: User,
    _inited?: boolean
}
