import React from 'react';
import { useTranslation } from 'react-i18next';

const AdminPanel = () => {
    const { t } = useTranslation('about');

    return (
        <div>
            {t('Админ панель')}
        </div>
    );
};

export default AdminPanel;
