import {classNames} from 'shared/lib/classNames/classNames';
import {DynamicModuleLoader, ReducersList} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {profileReducer} from 'entities/Profile';
import {Page} from 'widgets/Page/Page';
import {VStack} from 'shared/ui/Stack/VStack/VStack';
import {EditableProfileCard} from 'features/editableProfileCard';
import ProfilePageHeader from './ProfilePageHeader/ProfilePageHeader';
import cls from './ProfilePage.module.scss'

const reducers: ReducersList = {
    profile: profileReducer,
}

interface ProfilePageProps {
    className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount
        >
            <Page className={classNames(
                cls.ProfilePage,
                {},
                [className, cls.loading],
            )}
            >
                <VStack gap="16" max>
                    <ProfilePageHeader />
                    <EditableProfileCard />
                </VStack>

            </Page>
        </DynamicModuleLoader>
    );
};

export default ProfilePage
