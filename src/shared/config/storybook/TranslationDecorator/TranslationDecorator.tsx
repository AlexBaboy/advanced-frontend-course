import { Story } from '@storybook/react';
import { I18nextProvider } from 'react-i18next';
import { Suspense } from 'react';
import i18n from 'i18next';

export const TranslationDecorator = (StoryComponent: Story) => (
    <I18nextProvider i18n={i18n}>
        <Suspense fallback="">
            <StoryComponent />
        </Suspense>
    </I18nextProvider>
);
