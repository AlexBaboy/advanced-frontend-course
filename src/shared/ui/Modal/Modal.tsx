import {classNames} from "shared/lib/classNames/classNames";
import cls from './Modal.module.scss'
import {ReactNode, useEffect, useRef, useState} from "react";

interface ModalProps {
    className?: string
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
}

const ANIMATION_DELAY = 300

export const Modal = (props: ModalProps) => {

    const {
        className,
        children,
        isOpen,
        onClose
    } = props

    const [isClosing, setIsClosing] = useState(false)
    const timeRef = useRef<ReturnType<typeof setTimeout>>()

    const closeHandler = () => {
        if (onClose) {
            setIsClosing(true)
            timeRef.current = setTimeout(() => {
                onClose()
                setIsClosing(false)
            }, ANIMATION_DELAY)
        }
    }

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    const mods: Record<string, boolean | undefined> = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing
    }

    useEffect(() => {
        return () => clearTimeout(timeRef.current)
    }, [])

    return (
        <div className={classNames(
                    cls.Modal,
                    mods,
            [className]
            )}>

            <div className={cls.overlay}
                 onClick={closeHandler}
            >
                <div className={cls.content}
                    onClick={onContentClick}
                >
                    {children}
                </div>
            </div>

        </div>
    );
};
