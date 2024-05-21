import { Menu } from '@headlessui/react'
import { classNames } from 'shared/lib/classNames/classNames';
import { Fragment, ReactNode } from 'react';
import { DropdownDirection } from 'shared/types/ui';
import cls from './Dropdown.module.scss'
import {AppLink} from "shared/ui/AppLink/AppLink";

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
    direction?: DropdownDirection,
}

const mapDirectionClass: Record<DropdownDirection, string> = {
    'bottom left': cls.optionsBottomLeft,
    'bottom right': cls.optionsBottomRight,
    'top left': cls.optionsTopLeft,
    'top right': cls.optionsTopRight,
}

export const Dropdown = (props: DropdownProps) => {
    const {
        className,
        trigger,
        items,
        direction,
    } = props

    const menuClasses = [cls.options, direction && mapDirectionClass[direction]]

    return (
        <Menu as="div" className={classNames(cls.Dropdown, {}, [className])}>
            <Menu.Button className={cls.btn}>{trigger}</Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
                {items.map((item) => {
                    const content = ({ active }: {active: boolean}) => (
                        <button
                            type="button"
                            className={classNames(cls.item, { [cls.active]: active })}
                            onClick={item.onClick}
                            disabled={item.disabled}
                        >
                            {item.content}
                        </button>
                    )

                    if (item.href) {
                        return (
                            <Menu.Item as={AppLink} disabled={item.disabled} to={item.href}>
                                {content}
                            </Menu.Item>
                        )
                    }

                    return (
                        <Menu.Item as={Fragment} disabled={item.disabled}>
                            {content}
                        </Menu.Item>
                    )
                })}
            </Menu.Items>
        </Menu>
    )
}
