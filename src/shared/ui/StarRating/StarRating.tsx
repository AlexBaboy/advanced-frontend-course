import {classNames} from "@/shared/lib/classNames/classNames";
import cls from './StarRating.module.scss'
import {memo, useState} from "react";
import StarIcon from '@/shared/assets/icons/star.svg'
import {Icon} from "@/shared/ui/Icon/Icon";

interface StarRatingProps {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1,2,3,4,5]

export const StarRating = memo((props: StarRatingProps) => {

    const {
        className,
        onSelect,
        size= 30,
        selectedStars= 0,
    } = props

    const [currentStarsCount, setCurrentStarsCount] = useState(0)
    const [isSelected, setSelected] = useState(Boolean(selectedStars))

    const onHover = (starsCount: number) => {
        if (!isSelected) {
            setCurrentStarsCount(starsCount)
        }
    }

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0)
        }
    }

    const onClick = (starsCount: number) => {
        if (!isSelected) {
            onSelect?.(starsCount)
            setCurrentStarsCount(starsCount)
            setSelected(true)
        }
    }

    return (
        <div className={classNames(cls.Skeleton, {}, [className])}>
            {stars.map((starNumber) => (
                <Icon
                    Svg={StarIcon}
                    key={starNumber}
                    className={classNames(
                        cls.starIcon,
                        {},
                        [currentStarsCount >= starNumber ? cls.hovered : cls.normal]
                    )}
                    width={size}
                    height={size}
                    onMouseLeave={onLeave}
                    onMouseEnter={() => onHover(starNumber)}
                    onClick={() => onClick(starNumber)}
                />
            ))}
        </div>
    )
});