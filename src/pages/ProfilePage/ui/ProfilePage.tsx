import {classNames} from "shared/lib/classNames/classNames";
import cls from './ProfilePage.module.scss'
import {useTranslation} from "react-i18next";
import {DynamicModuleLoader, ReducersList} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import {
    fetchProfileData, getProfileError, getProfileIsLoading, getProfileReadOnly,
    Profile, profileActions,
    ProfileCard,
    profileReducer
} from "entities/Profile";
import {useAppDispatch} from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {useCallback, useEffect} from "react";
import {Loader} from "shared/ui/Loader/Loader";
import ProfilePageHeader from "./ProfilePageHeader/ProfilePageHeader";
import {useSelector} from "react-redux";

const reducers: ReducersList = {
    profile: profileReducer
}

interface ProfilePageProps {
    className?: string
}

const ProfilePage = ({className}: ProfilePageProps) => {

    const {t} = useTranslation()

    const dispatch = useAppDispatch()

    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfileReadOnly);

    useEffect(() => {
        dispatch(fetchProfileData())
    }, [])

    const onChangeFirstName = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({first: value || ''}))
    }, [])

    const onChangeLastName = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({lastname: value || ''}))
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
                    data={formData}
                    isLoading={isLoading}
                    error={error}
                    onChangeFirstName={onChangeFirstName}
                    onChangeLastName={onChangeLastName}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage