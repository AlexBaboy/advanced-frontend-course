// eslint-disable-next-line alexb-esling-plugin-path-checker/fsd-arch-path-checker
import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends SvgProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

interface NonClickableIconProps extends IconBaseProps {
    clickable?: false;
}

interface ClickableBaseProps extends IconBaseProps {
    clickable: true;
    onCLick: () => void;
}

type IconProps = NonClickableIconProps | ClickableBaseProps;

export const Icon = memo((props: IconProps) => {
    const { className, Svg, width = 32, height = 32, ...otherProps } = props;

    return (
        <Svg
            className={classNames(cls.Icon, {}, [className])}
            width={width}
            height={height}
            {...otherProps}
        />
    );
});
