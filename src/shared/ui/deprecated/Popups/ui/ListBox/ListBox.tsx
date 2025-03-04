import { Listbox as HListBox } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '../../../../redesigned/Button/Button';
import cls from './ListBox.module.scss';
import { HStack } from '../../../../redesigned/Stack';
import { DropdownDirection } from '@/shared/types/ui';
import { mapDirectionClass } from '../../styles/constants';
import popupCls from '../../styles/popup.module.scss';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { Icon } from '../../../../redesigned/Icon/Icon';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps {
    items: ListBoxItem[];
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange: (value: string) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
}

/*
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const ListBox = (props: ListBoxProps) => {
    const {
        className,
        value,
        defaultValue,
        onChange,
        readonly,
        items,
        direction,
        label,
    } = props;

    const optionsClasses = [
        cls.options,
        direction && mapDirectionClass[direction],
    ];

    return (
        <HStack gap="4">
            {label && <p>{`${label}>`}</p>}
            <HListBox
                as="div"
                className={classNames(cls.ListBox, {}, [
                    className,
                    popupCls.popup,
                ])}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                disabled={readonly}
            >
                <HListBox.Button
                    as={Button}
                    className={cls.trigger}
                    disabled={readonly}
                    addonRight={<Icon Svg={ArrowIcon} />}
                >
                    {value ?? defaultValue}
                </HListBox.Button>
                <HListBox.Options
                    className={classNames(cls.options, {}, optionsClasses)}
                >
                    {items.map((item) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(cls.item, {
                                        [popupCls.active]: active,
                                        [popupCls.disabled]: item.disabled,
                                    })}
                                >
                                    {item.content}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>
    );
};
