import {Menu} from '@headlessui/react'
import {classNames} from 'shared/lib/classNames/classNames';
import {Fragment, ReactNode} from 'react';
import cls from './Dropdown.module.scss'

export interface DropdownItem {
    disabled?: boolean,
    content?: ReactNode,
    onClick?: () => void,
    href?: string
}

interface DropdownProps {
    className?: string,
    items: DropdownItem[],
    trigger?: ReactNode,
}

export const Dropdown = (props: DropdownProps) => {
    const { className, trigger, items} = props

    return (
        <Menu as="div" className={classNames(cls.Dropdown, {}, [className])}>
            <Menu.Button className={cls.btn}>My account</Menu.Button>
            <Menu.Items className={cls.menu}>
                {items.map(item => {
                    return (
                        <Menu.Item as={Fragment} disabled={item.disabled}>
                            {({ active }) => (
                                <button
                                    type="button"
                                    className={classNames(cls.item, { [cls.active]: active })}
                                    onClick={item.onClick}
                                >
                                    {item.content}
                                </button>
                            )}
                        </Menu.Item>
                    )
                })}
            </Menu.Items>
        </Menu>
    )
}