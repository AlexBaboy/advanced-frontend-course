import {RouteProps} from "react-router-dom";
import {MainPage} from "pages/Main";
import {AboutPage} from "pages/About";

enum AppRoutes {
    MAIN =  'main',
    ABOUT  = 'about'
}

const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about'
}

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />
    }
}
