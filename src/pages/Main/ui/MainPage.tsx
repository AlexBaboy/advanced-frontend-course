import { useTranslation } from 'react-i18next';

const MainPage = () => {
    const { t } = useTranslation();

    return (
        <div data-testid="MainPage">
            {t('Главная страница')}
        </div>
    );
};

export default MainPage;
