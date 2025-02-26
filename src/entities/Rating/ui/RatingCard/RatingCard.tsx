import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './RatingCard.module.scss';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card/Card';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { StarRating } from '@/shared/ui/deprecated/StarRating/StarRating';
import { Modal } from '@/shared/ui/redesigned/Modal/Modal';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input/Input';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import {
    Button as ButtonDeprecated,
    ButtonSize,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button/Button';
import { Drawer } from '@/shared/ui/redesigned/Drawer/Drawer';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button } from '@/shared/ui/redesigned/Button/Button';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starCount: number) => void;
    onAccept?: (starCount: number, feedback?: string) => void;
    rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
    const { t } = useTranslation();

    const {
        className,
        onCancel,
        onAccept,
        feedbackTitle,
        hasFeedback,
        title,
        rate = 0,
    } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback(
        (selectedStarsCount: number) => {
            setStarsCount(selectedStarsCount);
            setIsModalOpen(true);

            if (hasFeedback) {
                setIsModalOpen(true);
            } else {
                onAccept?.(selectedStarsCount);
            }
        },
        [hasFeedback, onAccept],
    );

    const acceptHandler = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, starsCount]);

    const cancelHandler = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <>
                    <Text title={feedbackTitle} />
                    <Input
                        data-testid="RatingCard.Input"
                        value={feedback}
                        onChange={setFeedback}
                        placeholder={t('Ваш отзыв')}
                    />
                </>
            }
            off={
                <>
                    <TextDeprecated title={feedbackTitle} />
                    <InputDeprecated
                        data-testid="RatingCard.Input"
                        value={feedback}
                        onChange={setFeedback}
                        placeholder={t('Ваш отзыв')}
                    />
                </>
            }
        />
    );

    const content = (
        <>
            <VStack align="center" gap="8" max>
                <ToggleFeatures
                    feature={'isAppRedesigned'}
                    on={
                        <Text
                            title={starsCount ? t('Спасибо за оценку') : title}
                        />
                    }
                    off={
                        <TextDeprecated
                            title={starsCount ? t('Спасибо за оценку') : title}
                        />
                    }
                />

                <StarRating
                    size={40}
                    onSelect={onSelectStars}
                    selectedStars={starsCount}
                />
            </VStack>
            <BrowserView>
                <Modal lazy isOpen={isModalOpen}>
                    <VStack gap="32" max>
                        {modalContent}

                        <ToggleFeatures
                            feature={'isAppRedesigned'}
                            on={
                                <HStack max gap="32" justify="end">
                                    <Button
                                        data-testid="RatingCard.Close"
                                        onClick={cancelHandler}
                                    >
                                        {t('Закрыть')}
                                    </Button>
                                    <Button
                                        data-testid="RatingCard.Send"
                                        onClick={acceptHandler}
                                    >
                                        {t('Отправить')}
                                    </Button>
                                </HStack>
                            }
                            off={
                                <HStack max gap="32" justify="end">
                                    <ButtonDeprecated
                                        data-testid="RatingCard.Close"
                                        theme={ButtonTheme.OUTLINE_RED}
                                        onClick={cancelHandler}
                                    >
                                        {t('Закрыть')}
                                    </ButtonDeprecated>
                                    <ButtonDeprecated
                                        data-testid="RatingCard.Send"
                                        theme={ButtonTheme.OUTLINE}
                                        onClick={acceptHandler}
                                    >
                                        {t('Отправить')}
                                    </ButtonDeprecated>
                                </HStack>
                            }
                        />
                    </VStack>
                </Modal>
            </BrowserView>
            ;
            <MobileView>
                <Drawer lazy isOpen={isModalOpen} onClose={cancelHandler}>
                    <VStack max gap="32" />
                    {modalContent}

                    <ToggleFeatures
                        feature={'isAppRedesigned'}
                        on={
                            <Button
                                onClick={acceptHandler}
                                size={'l'}
                                fullWidth
                            >
                                {t('Отправить')}
                            </Button>
                        }
                        off={
                            <ButtonDeprecated
                                onClick={acceptHandler}
                                size={ButtonSize.L}
                                fullWidth
                            >
                                {t('Отправить')}
                            </ButtonDeprecated>
                        }
                    />
                </Drawer>
            </MobileView>
        </>
    );

    return (
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <Card max padding={'24'} border={'partial'}>
                    {content}
                </Card>
            }
            off={
                <CardDeprecated
                    data-testid="RatingCard"
                    className={classNames(cls.RatingCard, {}, [className])}
                    max
                >
                    {content}
                </CardDeprecated>
            }
        />
    );
});
