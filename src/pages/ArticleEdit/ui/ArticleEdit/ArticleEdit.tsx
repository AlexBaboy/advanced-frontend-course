import {classNames} from "shared/lib/classNames/classNames";
import cls from "./ArticleEdit.module.scss";
import {memo} from "react";
import {Page} from "widgets/Page/Page";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

interface ArticleEditProps {
	className?: string
}

const ArticleEdit = (props: ArticleEditProps) => {

	const {
		className
	} = props

	const {t} = useTranslation()
	const {id} = useParams<{id: string}>()

	return (
		<Page
			className={classNames(
				cls.ArticleEdit,
				{},
				[className]
			)}>
				{id
					? t('Редактирование статьи ID = ') + id
					: t('Создание новой статьи')
				}
		</Page>
	)
}

export default memo(ArticleEdit)