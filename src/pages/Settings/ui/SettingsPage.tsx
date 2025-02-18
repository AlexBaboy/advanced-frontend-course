import React from 'react';
import {useTranslation} from 'react-i18next';
import {Page} from '@/widgets/Page';
import {Text} from '@/shared/ui/deprecated/Text/Text';

const SettingsPage = () => {
    const {t} = useTranslation('about');

    return (
        <Page data-testid="SettingsPage">
            <Text title={t('Настройки пользователя')}></Text>
        </Page>
    )
};

export default SettingsPage;
