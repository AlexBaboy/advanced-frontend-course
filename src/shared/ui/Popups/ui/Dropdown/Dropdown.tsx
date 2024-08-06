import {Menu} from '@headlessui/react'
import {classNames} from '@/shared/lib/classNames/classNames';
import {Fragment, ReactNode} from 'react';
import {DropdownDirection} from '@/shared/types/ui';
import {AppLink} from "@/shared/ui/AppLink/AppLink";
import cls from './Dropdown.module.scss'
import {mapDirectionClass} from "../../styles/constants";
import popupCls from '../../styles/popup.module.scss'

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

export const Dropdown = (props: DropdownProps) => {
    const {
        className,
        trigger,
        items,
        direction,
    } = props

    const menuClasses = [cls.options, direction && mapDirectionClass[direction]]

    return (
        <Menu as="div" className={classNames(cls.Dropdown, {}, [className, popupCls.popup])}>
            <Menu.Button className={popupCls.trigger}>{trigger}</Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
                {items.map((item, index) => {
                    const content = ({active}: { active: boolean }) => (
                        <button
                            type="button"
                            className={classNames(cls.item, {[popupCls.active]: active})}
                            onClick={item.onClick}
                            disabled={item.disabled}
                        >
                            {item.content}
                        </button>
                    )

                    if (item.href) {
                        return (
                            <Menu.Item key={index} as={AppLink} disabled={item.disabled} to={item.href}>
                                {content}
                            </Menu.Item>
                        )
                    }

                    return (
                        <Menu.Item key={index} as={Fragment} disabled={item.disabled}>
                            {content}
                        </Menu.Item>
                    )
                })}
            </Menu.Items>
        </Menu>
    )
}
