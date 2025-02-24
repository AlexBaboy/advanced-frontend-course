import { memo } from "react";
import { ArticleDetails, getArticleDetailsData } from "@/entities/Article";
import { useParams } from "react-router-dom";
import { Card } from "@/shared/ui/redesigned/Card/Card";
import { ArticleAdditionalInfo } from "@/widgets/ArticleAdditionalInfo";
import { useSelector } from "react-redux";

interface AdditionalInfoContainerProps {
  className?: string;
}

export const AdditionalInfoContainer = memo((props: AdditionalInfoContainerProps) => {

  const {
    className
  } = props;

  const article = useSelector(getArticleDetailsData);

  if (!article) return null;

  return (
    <Card className={className} padding={"24"} border={"round"}>
      <ArticleAdditionalInfo author={article.user} createdAt={article.createdAt} views={article.views} />
    </Card>);
};
