import {classNames} from "shared/lib/classNames/classNames";
import cls from "pages/ArticlesPage/ui/ArticlesPage/ArticlesPage.module.scss";
import {memo} from "react";

interface ArticleEditProps {
	className?: string
}

const ArticleEdit = (props: ArticleEditProps) => {

	const {
		className
	} = props

	return (
		<div
			className={classNames(
				cls.ArticleEdit,
				{},
				[className]
			)}>
				article edit page
		</div>
	)
}

export default memo(ArticleEdit)