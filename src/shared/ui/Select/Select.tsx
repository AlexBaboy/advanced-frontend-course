import {classNames, Mods} from "@/shared/lib/classNames/classNames";
import cls from './Select.module.scss'
import {ChangeEvent, memo, useMemo} from "react";

export type SelectOption<T extends string> = {
    value: string
    content: string
}

interface SelectProps<T extends string> {
    className?: string
    label?: string
    options?: SelectOption<T>[]
    value?: T
    onChange?: (value: T) => void
    readOnly?: boolean
}

export const Select = <T extends string>(props: SelectProps<T>) => {

    const {
        className,
        label,
        options,
        value,
        onChange,
        readOnly
    } = props

    const optionList = useMemo(() => {
        return options?.map(opt => (
            <option
                className={cls.option}
                key={opt.value}
                value={opt.value}
            >
                {opt.content}
            </option>
        ))
    }, [options])

    const mods: Mods = {}

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value as T)
    }

    return (
        <div className={classNames(cls.Wrapper, {}, [className])}>
            {label && <div className={cls.label}>{label + '>'}</div>}
            <select
                className={cls.select}
                value={value}
                onChange={onChangeHandler}
                disabled={readOnly}
            >
                {optionList}
            </select>
        </div>
    )
};
