import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';
import StarIcon from '@/shared/assets/icons/star.svg';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon/Icon';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';

interface StarRatingProps {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

/*
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const StarRating = memo((props: StarRatingProps) => {
    const { className, onSelect, size = 30, selectedStars = 0 } = props;

    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
    const [isSelected, setSelected] = useState(Boolean(selectedStars));

    const onHover = (starsCount: number) => {
        if (!isSelected) {
            setCurrentStarsCount(starsCount);
        }
    };

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    };

    const onClick = (starsCount: number) => {
        if (!isSelected) {
            onSelect?.(starsCount);
            setCurrentStarsCount(starsCount);
            setSelected(true);
        }
    };

    return (
        <div
            className={classNames(
                toggleFeatures({
                    name: 'isAppRedesigned',
                    on: () => cls.StarRatingRedesigned,
                    off: () => cls.StarRating,
                }),
                {},
                [className],
            )}
        >
            {stars.map((starNumber) => {
                const commonProps = {
                    Svg: StarIcon,
                    key: starNumber,
                    className: classNames(cls.starIcon, {}, [
                        currentStarsCount >= starNumber
                            ? cls.hovered
                            : cls.normal,
                    ]),
                    width: size,
                    height: size,
                    onMouseLeave: onLeave,
                    onMouseEnter: () => onHover(starNumber),
                    onClick: () => onClick(starNumber),
                    'data-testid': `StarRating.${starNumber}`,
                    'data - selected': currentStarsCount >= starNumber,
                };

                return (
                    <ToggleFeatures
                        feature={'isAppRedesigned'}
                        on={<Icon clickable={!isSelected} {...commonProps} />}
                        off={<IconDeprecated {...commonProps} />}
                    />
                );
            })}
        </div>
    );
});
