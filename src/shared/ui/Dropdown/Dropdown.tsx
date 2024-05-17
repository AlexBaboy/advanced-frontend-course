import { Menu } from '@headlessui/react'
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Dropdown.module.scss'

interface DropdownProps {
    className?: string
}

export const Dropdown = (props: DropdownProps) => {

    const {className} = props

    return (
        <Menu as="div" className={classNames(cls.Dropdown, {}, [className])}>
            <Menu.Button>My account</Menu.Button>
            <Menu.Items anchor="bottom">
                <Menu.Item>
                    <a className="block data-[focus]:bg-blue-100" href="/settings">
                        Settings
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a className="block data-[focus]:bg-blue-100" href="/support">
                        Support
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a className="block data-[focus]:bg-blue-100" href="/license">
                        License
                    </a>
                </Menu.Item>
            </Menu.Items>
        </Menu>
    )
}