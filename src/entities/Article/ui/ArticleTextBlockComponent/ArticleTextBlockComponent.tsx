import {useTranslation} from 'react-i18next';
import {memo} from 'react';
import {classNames} from '@/shared/lib/classNames/classNames';
import cls from './ArticleTextBlockComponent.module.scss';
import {ArticleTextBlock} from '../../model/types/article';
import {Text as TextDeprecated} from '@/shared/ui/deprecated/Text/Text';
import {Text} from '@/shared/ui/redesigned/Text/Text';
import {ToggleFeatures} from "@/shared/lib/features";

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
    (props: ArticleTextBlockComponentProps) => {
        const {className, block} = props;

        const {t} = useTranslation();

        return (
            <div
                className={classNames(cls.ArticleTextBlockComponent, {}, [
                    className,
                ])}
            >
                {block.title && (
                    <ToggleFeatures feature={'isAppRedesigned'}
                                    on={<Text className={cls.title} title={block.title}/>}
                                    off={<TextDeprecated className={cls.title} title={block.title}/>}/>

                )}
                {block.paragraphs.map((paragraph, index) => (
                    <ToggleFeatures feature={'isAppRedesigned'}
                                    on={<Text
                                        className={cls.paragraph}
                                        key={index}
                                        text={paragraph}
                                    />}
                                    off={<TextDeprecated
                                        className={cls.paragraph}
                                        key={index}
                                        text={paragraph}
                                    />}/>

                ))}
            </div>
        );
    },
);
