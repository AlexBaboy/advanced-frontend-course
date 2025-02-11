import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './RatingCard.module.scss';
import { Card } from '@/shared/ui/deprecated/Card/Card';
import { HStack, VStack } from 'src/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/deprecated/Text/Text';
import { StarRating } from '@/shared/ui/deprecated/StarRating/StarRating';
import { Modal } from '@/shared/ui/deprecated/Modal/Modal';
import { Input } from '@/shared/ui/deprecated/Input/Input';
import {
    Button,
    ButtonSize,
    ButtonTheme,
} from '@/shared/ui/deprecated/Button/Button';
import { Drawer } from '@/shared/ui/deprecated/Drawer/Drawer';

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
        <>
            <Text title={feedbackTitle} />
            <Input
                data-testid="RatingCard.Input"
                value={feedback}
                onChange={setFeedback}
                placeholder={t('Ваш отзыв')}
            />
        </>
    );

    return (
        <Card
            data-testid="RatingCard"
            className={classNames(cls.RatingCard, {}, [className])}
            max
        >
            <VStack align="center" gap="8" max>
                <Text title={starsCount ? t('Спасибо за оценку') : title} />
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
                        <HStack max gap="32" justify="end">
                            <Button
                                data-testid="RatingCard.Close"
                                theme={ButtonTheme.OUTLINE_RED}
                                onClick={cancelHandler}
                            >
                                {t('Закрыть')}
                            </Button>
                            <Button
                                data-testid="RatingCard.Send"
                                theme={ButtonTheme.OUTLINE}
                                onClick={acceptHandler}
                            >
                                {t('Отправить')}
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer lazy isOpen={isModalOpen} onClose={cancelHandler}>
                    <VStack max gap="32" />
                    {modalContent}
                    <Button
                        onClick={acceptHandler}
                        size={ButtonSize.L}
                        fullWidth
                    >
                        {t('Отправить')}
                    </Button>
                </Drawer>
            </MobileView>
        </Card>
    );
});
