import {classNames, Mods} from "shared/lib/classNames/classNames";
import cls from './CurrencySelect.module.scss'
import {useTranslation} from "react-i18next";
import {memo, useCallback} from "react";
import {Select} from "shared/ui/Select/Select";
import {Currency} from "../../model/types/currency";

interface CurrencySelectProps {
    className?: string
    value?: Currency
    onChange?: (value: Currency) => void
}

const  options=[
        {value: Currency.RUB, content: Currency.RUB},
        {value: Currency.EUR, content: Currency.EUR},
        {value: Currency.USD, content: Currency.USD},
    ]

export const CurrencySelect = memo((props: CurrencySelectProps) => {

    const {
        className,
        value,
        onChange,
    } = props

    const {t} = useTranslation()

    const mods: Mods = {}

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Currency)
    },[onChange])

    return (
        <Select
            className={classNames(
            cls.CurrencySelect,
            mods,[className])}
            label={t('Укажите валюту')}
            options={options}
            value={value}
            onChange={onChangeHandler}
        />
    );
})
