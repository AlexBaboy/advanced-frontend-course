import {classNames} from "shared/lib/classNames/classNames";
import cls from './ProfilePage.module.scss'
import {useTranslation} from "react-i18next";

interface ProfilePageProps {
    className?: string
}

const ProfilePage = ({className}: ProfilePageProps) => {

    const {t} = useTranslation()

    return (
        <div className={classNames(
                    cls.ProfilePage,
                    {},
                [className]
            )}>
            {t('Profile page')}
        </div>
    );
};

export default ProfilePage
