import {classNames} from "shared/lib/classNames/classNames";
import cls from './ProfilePage.module.scss'
import {useTranslation} from "react-i18next";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
    fetchProfileData,
    Profile,
    ProfileCard,
    profileReducer
} from "entities/Profile";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useEffect} from "react";
import {Loader} from "shared/ui/Loader/Loader";
import ProfilePageHeader from "./ProfilePageHeader/ProfilePageHeader";


const reducers: ReducersList = {
    profile: profileReducer
}

interface ProfilePageProps {
    className?: string
    data?: Profile
    error?: string
    isLoading?: boolean
}

const ProfilePage = (props: ProfilePageProps) => {

    const {t} = useTranslation()

    const {
        className,
        data,
        isLoading,
        error
    } = props

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchProfileData())
    }, [])

    if (isLoading) {
        return (
            <div className={classNames(
                cls.ProfilePage,
                {},
                [className]
            )}>
                <Loader />
            </div>
        )
    }

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount
        >
            <div className={classNames(
                        cls.ProfilePage,
                        {},
                    [className, cls.loading]
                )}>
                <ProfilePageHeader />
                <ProfileCard
                    data={data}
                    isLoading={isLoading}
                    error={error}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage