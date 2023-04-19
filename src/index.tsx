import {render} from "react-dom";
import App from "./app/App";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "app/providers/ThemeProvider";
import 'shared/config/i18n/i18n'
import {ErrorBoundary} from "app/providers/ErrorBoundary";
import './app/styles/index.scss'
import {Provider} from "react-redux";
import {store} from "app/providers/StoreProvider/config/store";

render(
    <Provider store={store}>
        <BrowserRouter>
            <ErrorBoundary>
                <ThemeProvider>
                    <App/>
                </ThemeProvider>
            </ErrorBoundary>
        </BrowserRouter>
    </Provider>
        ,
    document.getElementById('root')
)
