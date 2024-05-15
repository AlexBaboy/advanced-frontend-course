import {
    Listbox as HListBox, ListboxButton, ListboxOption, ListboxOptions,
} from '@headlessui/react'
import { Fragment, ReactNode, useState} from 'react'
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import cls from './ListBox.module.scss'

export interface ListBoxItem {
    value: string,
    content: ReactNode,
    disabled?: boolean,
}

type DropdownDirection = 'top' | 'bottom'

interface ListBoxProps {
    items: ListBoxItem[],
    className?: string,
    value?: string
    defaultValue?: string,
    onChange: (value: string) => void,
    readonly?: boolean,
    direction?: DropdownDirection
}


export const ListBox = (props: ListBoxProps) => {

    const {
        className,
        value,
        defaultValue,
        onChange,
        readonly,
        items,
        direction
    } = props

    const optionsClasses = [cls.options, direction && cls[direction]]

    return (
        <HListBox
            as={'div'}
            className={classNames(cls.ListBox, {}, [className])}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            disabled={readonly}
        >

            <ListboxButton
                className={cls.trigger}
                disabled={readonly}
            >
                <Button
                    disabled={readonly}
                >
                    {value ?? defaultValue}
                </Button>

            </ListboxButton>
            <ListboxOptions
                anchor="bottom"
                className={classNames(cls.options, {}, optionsClasses)}>
                {items.map((item) => (
                    <ListboxOption
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

                    </ListboxOption>
                ))}
            </ListboxOptions>
        </HListBox>
    )
}
