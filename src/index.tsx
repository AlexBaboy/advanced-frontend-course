import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import '@/shared/config/i18n/i18n';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import './app/styles/index.scss';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { createRoot } from 'react-dom/client';
import { ForceUpdateProvider } from '@/shared/lib/render/forceUpdate';

const container = document.getElementById('root');

if (!container) {
    throw new Error('Контейнер не найден!');
}

const root = createRoot(container);

root.render(
    <StoreProvider>
        <BrowserRouter>
            <ErrorBoundary>
                <ForceUpdateProvider>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </ForceUpdateProvider>
            </ErrorBoundary>
        </BrowserRouter>
    </StoreProvider>,
);
export { Theme } from '@/shared/const/theme';
