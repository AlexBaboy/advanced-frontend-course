import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import CircleIcon from '@/shared/assets/icons/circle-up.svg';

export const ScrollToTopButton = () => {
    const onClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Icon
            Svg={CircleIcon}
            clickable
            width={32}
            height={32}
            onClick={onClick}
        />
    );
};
