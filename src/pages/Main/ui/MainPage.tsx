import { useTranslation } from 'react-i18next';
import {StarRating} from "@/shared/ui/StarRating/StarRating";

const MainPage = () => {
    const { t } = useTranslation();

    return (
        <div>
            {t('Главная страница')}
            <StarRating size={50} />
        </div>
    );
};

export default MainPage;
