import {memo, useMemo} from "react";
import {useTranslation} from "react-i18next";
import {ListBox} from "@/shared/ui/redesigned/Popups";
import {classNames} from "@/shared/lib/classNames/classNames";
import {getFeatureFlags} from "@/shared/lib/features";

interface UiDesignSwitcherProps {
    className?: string;
}

enum ITEMS_DESIGN {
    NEW = 'new',
    OLD = 'old'
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
    const {className} = props
    const {t} = useTranslation()

    const isAppRedesigned = getFeatureFlags('isAppRedesigned')

    const items = useMemo(() => [
        {
            content: t('Новый'),
            value: ITEMS_DESIGN.NEW
        },
        {
            content: t('Старый'),
            value: ITEMS_DESIGN.OLD
        }
    ], [t]);

    const onChange = () => {

    }

    return (
        <ListBox onChange={onChange} value={isAppRedesigned ? ITEMS_DESIGN.NEW : ITEMS_DESIGN.OLD} items={items} className={classNames()} />
    )

})