import {Listbox as HListBox} from '@headlessui/react'
import {Fragment, ReactNode} from 'react'
import {classNames} from 'shared/lib/classNames/classNames';
import {Button} from 'shared/ui/Button/Button';
import cls from './ListBox.module.scss'
import {HStack} from 'shared/ui/Stack';
import {DropdownDirection} from 'shared/types/ui';

export interface ListBoxItem {
    value: string,
    content: ReactNode,
    disabled?: boolean,
}

interface ListBoxProps {
    items: ListBoxItem[],
    className?: string,
    value?: string
    defaultValue?: string,
    onChange: (value: string) => void,
    readonly?: boolean,
    direction?: DropdownDirection,
    label?: string
}

const mapDirectionClass: Record<DropdownDirection, string> = {
    'bottom left': cls.optionsBottomLeft,
    'bottom right': cls.optionsBottomRight,
    'top left': cls.optionsTopLeft,
    'top right': cls.optionsTopRight,
}

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
    } = props

    const optionsClasses = [cls.options, direction && mapDirectionClass[direction]]

    return (
        <HStack gap="4">
            {label && <p>{`${label}>`}</p>}
            <HListBox
                as="div"
                className={classNames(cls.ListBox, {}, [className])}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                disabled={readonly}
            >

                <HListBox.Button className={cls.trigger}>
                    <Button disabled={readonly}>
                        {value ?? defaultValue}
                    </Button>

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
                            {({ active, selected}) => (
                                <li
                                    className={classNames(cls.item, {
                                        [cls.active]: active,
                                        [cls.disabled]: item.disabled,
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
    )
}
