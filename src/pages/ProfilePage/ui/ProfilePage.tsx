import {classNames} from '@/shared/lib/classNames/classNames';
import {VStack} from '@/shared/ui/Stack/VStack/VStack';
import {EditableProfileCard} from '@/features/editableProfileCard';
import cls from './ProfilePage.module.scss'
import {useParams} from 'react-router-dom';
import {Page} from "@/widgets/Page";

interface ProfilePageProps {
    className?: string
}

const ProfilePage = ({className}: ProfilePageProps) => {

    const { id} = useParams<{id: string}>()

    return (
        <Page className={classNames(
            cls.ProfilePage,
            {},
            [className, cls.loading],
        )}
        >
            <VStack gap="16" max>
                <EditableProfileCard id={id} />
            </VStack>
        </Page>
    );
};

export default ProfilePage
