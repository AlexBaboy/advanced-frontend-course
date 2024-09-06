import {useTranslation} from 'react-i18next';
import {RatingCard} from "@/entities/Rating/ui/RatingCard/RatingCard";

const MainPage = () => {
    const { t } = useTranslation();

    return (
        <div>
            {t('Главная страница')}
            <RatingCard
                title={'как вам статья?'}
                feedbackTitle={'оставьте отзыв'}
                hasFeedback
            />
        </div>
    );
};

export default MainPage;
