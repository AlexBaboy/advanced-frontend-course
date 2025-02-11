import { Popover as HPopover } from '@headlessui/react';
import { ReactNode } from 'react';
import { DropdownDirection } from '@/shared/types/ui';
import cls from '@/shared/ui/deprecated/Popups/ui/ListBox/ListBox.module.scss';
import { mapDirectionClass } from '../../styles/constants';
import popupCls from '../../styles/popup.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

interface PopoverProps {
    className?: string;
    trigger?: ReactNode;
    direction?: DropdownDirection;
    children: ReactNode;
}

export const Popover = (props: PopoverProps) => {
    const { className, trigger, direction = 'bottom right', children } = props;
    const optionsClasses = [cls.options, mapDirectionClass[direction], popupCls.menu];

    return (
        <div className={classNames(cls.popup, {}, [className, popupCls.popup])}>
            <HPopover className="relative">
                <HPopover.Button as="div" className={popupCls.trigger}>
                    {trigger}
                </HPopover.Button>

                <HPopover.Panel
                    className={classNames(cls.panel, {}, optionsClasses)}
                >
                    {children}
                </HPopover.Panel>
            </HPopover>
        </div>
    );
};
