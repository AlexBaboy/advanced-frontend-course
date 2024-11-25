import { ArticleDetailsCommentSchema } from './ArticleDetailsCommentSchema';
import { ArticleDetailsRecommendationsSchema } from './ArticleDetailsRecommendationsSchema';

export type ArticleDetailsPageSchema = {
    comments: ArticleDetailsCommentSchema;
    recommendations: ArticleDetailsRecommendationsSchema;
};
