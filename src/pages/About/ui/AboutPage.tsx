import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

const SettingsPage = () => {
    const { t } = useTranslation('about');

    return <Page data-testid="SettingsPage">{t('О приложении')}</Page>;
};

export default AboutPage;
