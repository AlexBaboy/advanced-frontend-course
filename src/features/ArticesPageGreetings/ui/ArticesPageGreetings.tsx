import { useTranslation } from 'react-i18next';
import { Modal } from '@/shared/ui/deprecated/Modal/Modal';
import React, { useEffect, useState } from 'react';
import { Text } from '@/shared/ui/deprecated/Text/Text';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { isMobile } from 'react-device-detect';
import { Drawer } from '@/shared/ui/deprecated/Drawer/Drawer';

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

    const text = (
        <Text
            title={t('Добро пожаловать на страницу статей')}
            text={t(
                'Здесь вы можете искать и просматривать статьи на разные темы',
            )}
        />
    );

    if (isMobile) {
        return (
            <Drawer lazy isOpen={isOpen} onClose={onClose}>
                {text}
            </Drawer>
        );
    }

    return (
        <Modal lazy isOpen={isOpen} onClose={onClose}>
            {text}
        </Modal>
    );
};
