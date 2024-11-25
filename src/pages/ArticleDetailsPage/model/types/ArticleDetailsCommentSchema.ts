import { EntityState } from '@reduxjs/toolkit';
import { CommentItem } from '@/entities/Comment';

export type ArticleDetailsCommentSchema = EntityState<CommentItem> & {
    isLoading?: boolean;
    error?: string;
};
