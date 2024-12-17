import { useTranslation } from 'react-i18next';
import { Modal } from '@/shared/ui/Modal/Modal';
import { useEffect, useState } from 'react';
import { Text } from '@/shared/ui/Text/Text';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';

export const ArticlesPageGreetings = () => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const { isArticlesPageWasOpened } = useJsonSettings();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!isArticlesPageWasOpened) {
            setIsOpen(true);
            dispatch(saveJsonSettings({ isArticlesPageWasOpened: true }));
        }
    }, [isArticlesPageWasOpened]);

    const onClose = () => setIsOpen(false);

    return (
        <Modal lazy isOpen={isOpen} onClose={onClose}>
            <Text
                title={t('Добро пожаловать на страницу статей')}
                text={t(
                    'Здесь вы можете искать и просматривать статьи на разные темы',
                )}
            />
        </Modal>
    );
};
