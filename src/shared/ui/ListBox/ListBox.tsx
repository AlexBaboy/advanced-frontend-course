import {
    Listbox as HListBox, ListboxButton, ListboxOption, ListboxOptions,
} from '@headlessui/react'
import {Fragment, ReactNode, useState} from 'react'
import cls from './ListBox.module.scss'
import {classNames} from "shared/lib/classNames/classNames";
import {Button} from "shared/ui/Button/Button";

const people = [
    { id: 1, name: 'Durward Reynolds' },
    { id: 2, name: 'Kenton Towne' },
    { id: 3, name: 'Therese Wunsch' },
    { id: 4, name: 'Benedict Kessler' },
    { id: 5, name: 'Katelyn Rohan' },
]

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
    onChange: (value: string) => void
}

export const ListBox = (props: ListBoxProps) => {

    const {
        className,
        value,
        defaultValue,
        onChange,
        items} = props

    const [selectedPerson, setSelectedPerson] = useState()

    return (
        <HListBox
            as={'div'}
            className={classNames(cls.ListBox, {}, [className])}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}>
            <ListboxButton
                className={cls.trigger}
            >
                <Button>
                    {value ?? defaultValue}
                </Button>

            </ListboxButton>
            <ListboxOptions anchor="bottom" className={cls.options}>
                {items.map((item) => (
                    <ListboxOption
                        key={item.value}
                        value={item.value}
                        className={cls.item}>
                        disabled={item.disabled}
                        as={Fragment}

                        {({active, selected}) => (
                            <li
                                className={classNames(cls.item, {[cls.active]: active}}
                            ></li>
                        )}

                    </ListboxOption>
                ))}
            </ListboxOptions>
        </HListBox>
    )
}
