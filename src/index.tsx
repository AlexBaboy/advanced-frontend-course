import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import 'shared/config/i18n/i18n';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import './app/styles/index.scss';
import { StoreProvider } from 'app/providers/StoreProvider';
import { DevSupport } from '@react-buddy/ide-toolbox';
import { ComponentPreviews, useInitial } from 'dev';
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root');

if (!container) {
    throw new Error('Контейнер не найден!')
}

const root = createRoot(container)

root.render(
    <StoreProvider>
        <BrowserRouter>
            <ErrorBoundary>
                <ThemeProvider>
                    <DevSupport
                        ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
                    >
                        <App />
                    </DevSupport>
                </ThemeProvider>
            </ErrorBoundary>
        </BrowserRouter>
    </StoreProvider>,
)