import {lazy} from "react";
import {AddCommentFormProps} from "./AddCommentForm";

// @ts-ignore
export const AddCommentFormAsync = lazy<FC<AddCommentFormProps>>( ()=> import('./AddCommentForm'))
