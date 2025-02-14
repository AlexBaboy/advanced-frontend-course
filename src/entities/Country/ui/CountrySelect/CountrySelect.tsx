import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import {ListBox as ListBoxDeprecated} from '@/shared/ui/deprecated/Popups/ui/ListBox/ListBox';
import { Country } from '../../model/types/country';
import {ToggleFeatures} from "@/shared/lib/features";
import {ListBox} from "@/shared/ui/redesigned/Popups";

interface CountrySelectProps {
    className?: string;
    value?: Country;
    onChange?: (value: Country) => void;
    readonly?: boolean;
}

const options = [
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
];

export const CountrySelect = memo((props: CountrySelectProps) => {
    const { className, value, onChange, readonly } = props;

    const { t } = useTranslation();

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as Country);
        },
        [onChange],
    );

    const propsListBox = {
        value: value,
        items: options,
        defaultValue: t('Укажите страну'),
        label: t('Укажите страну'),
        className: className,
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

    /*return (
        <ListBox
            value={value}
            items={options}
            defaultValue={t('Укажите страну')}
            label={t('Укажите страну')}
            onChange={onChangeHandler}
            className={className}
            readonly={readonly}
            direction="top right"
        />
    );*/
});
