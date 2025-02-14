import {useTranslation} from 'react-i18next';
import {memo, useCallback} from 'react';
import {ListBox as ListBoxDeprecated} from '@/shared/ui/deprecated/Popups/ui/ListBox/ListBox';
import {Currency} from '../../model/types/currency';
import {ToggleFeatures} from "@/shared/lib/features";
import {ListBox} from "@/shared/ui/redesigned/Popups";

interface CurrencySelectProps {
    className?: string;
    value?: Currency;
    onChange?: (value: Currency) => void;
    readOnly?: boolean;
}

const options = [
    {value: Currency.RUB, content: Currency.RUB},
    {value: Currency.EUR, content: Currency.EUR},
    {value: Currency.USD, content: Currency.USD},
];

export const CurrencySelect = memo((props: CurrencySelectProps) => {
    const {className, value, onChange, readOnly} = props;

    const {t} = useTranslation();

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Currency);
        },
        [onChange],
    );

    const propsListBox = {
        value: value,
        items: options,
        defaultValue: t('Укажите валюту'),
        label: t('Укажите валюту'),
        className: className,
        readonly: readOnly,
        direction: "bottom right" as const,
        onChange: onChangeHandler
    }

    return (
        <ToggleFeatures
            on={<ListBox {...propsListBox} />}
            off={<ListBoxDeprecated {...propsListBox} />}
            feature={'isAppRedesigned'}
        />
    );
});
