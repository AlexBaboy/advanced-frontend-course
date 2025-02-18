import React from 'react';
import {useTranslation} from 'react-i18next';
import {Page} from '@/widgets/Page';
import {Text} from '@/shared/ui/deprecated/Text/Text';
import {VStack} from "@/shared/ui/redesigned/Stack";
import {UiDesignSwitcher} from "@/features/UiDesignSwitcher/ui/UiDesignSwitcher/UiDesignSwitcher";

const SettingsPage = () => {
    const {t} = useTranslation('about');

    return (
        <Page data-testid="SettingsPage">
            <VStack gap={'16'}>
                <Text title={t('Настройки пользователя')} />
                <UiDesignSwitcher />
            </VStack>
        </Page>
    )
};

export default SettingsPage;
