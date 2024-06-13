import React from 'react';
import { useTranslation } from 'react-i18next';

const AdminPanel = () => {
    const { t } = useTranslation('about')

    return (
        <div>
            {t('Админка')}
        </div>
    );
};

export default AdminPanel;
