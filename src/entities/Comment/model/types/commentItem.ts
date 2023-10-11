import {User} from "entities/User";

export type CommentItem = {
    id: string,
    user: User,
    text: string
}