import { Popover as HPopover, PopoverButton, PopoverPanel } from '@headlessui/react'
import {ReactNode} from "react";
import {DropdownDirection} from "shared/types/ui";
import cls from "shared/ui/Popups/ui/ListBox/ListBox.module.scss";
import {mapDirectionClass} from "../../styles/constants";

interface PopoverProps {
    className?: string;
    trigger?: ReactNode;
    direction?: DropdownDirection;
}

export const Popover = (props: PopoverProps) => {

    const { className, trigger, direction } = props
    const optionsClasses = [cls.options, direction && mapDirectionClass[direction]]

    return (
        <HPopover className="relative">
            <PopoverButton>
                {trigger}
            </PopoverButton>
            {/*<PopoverPanel anchor="bottom" className="flex flex-col">
                <a href="/analytics">Analytics</a>
                <a href="/engagement">Engagement</a>
                <a href="/security">Security</a>
                <a href="/integrations">Integrations</a>
            </PopoverPanel>*/}
        </HPopover>
    )
}
