import {memo, useMemo, useState} from "react";
import {useTranslation} from "react-i18next";
import {ListBox} from "@/shared/ui/redesigned/Popups";
import {getFeatureFlags, updateFeatureFlag} from "@/shared/lib/features";
import {useAppDispatch} from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useSelector} from "react-redux";
import {getUserAuthData} from "@/entities/User";
import {HStack} from "@/shared/ui/redesigned/Stack";
import {Skeleton} from "@/shared/ui/redesigned/Skeleton/Skeleton";
import {Text} from '@/shared/ui/deprecated/Text/Text';

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

    const dispatch = useAppDispatch()

    const authDate = useSelector(getUserAuthData)
    const [isLoading, setIsLoading] = useState(false)

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

    const onChange = async (value: string) => {

        if (!authDate) return

        setIsLoading(true)
        await dispatch(updateFeatureFlag({
            userId: authDate?.id,
            newFeatures: {
                isAppRedesigned: value === ITEMS_DESIGN.NEW
            }
        })).unwrap()
        setIsLoading(false)
    }

    return (
        <HStack>
            <Text text={t('Вариант интерфейса')}/>
            {isLoading ? (
                <Skeleton width={100} height={40}/>
            ) : (
                <ListBox
                    onChange={onChange}
                    value={isAppRedesigned ? ITEMS_DESIGN.NEW : ITEMS_DESIGN.OLD}
                    items={items}
                    className={className}
                />
            )}
        </HStack>
    );
})
