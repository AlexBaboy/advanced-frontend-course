import React, {Suspense, useMemo} from 'react';
import {Route, Routes} from "react-router-dom";
import {AboutPage} from "pages/About";
import {MainPage} from "pages/Main";
import {routeConfig} from "shared/config/routeConfig/routeConfig";
import {PageLoader} from "widgets/PageLoader/PageLoader";
import {useSelector} from "react-redux";
import {getUserAuthData} from "entities/User";

export const AppRouter = () => {

    const isAuth = useSelector(getUserAuthData)

    const routes = useMemo(() => {
        return Object.values(routeConfig).filter(route => {
            return !(route.authOnly && !isAuth);

        })
    }, [isAuth])

    return (
            <Routes>
                {routes.
                    map(({path, element}) => (
                        <Route
                            key={path}
                            path={path}
                            element={(
                                <Suspense fallback={<PageLoader />}>
                                    <div className={'page-wrapper'}>
                                        {element}
                                    </div>
                                </Suspense>
                                )}
                        />
                    ))
                }
                <Route path={'/about'}
                       element={<AboutPage />}/>
                <Route path={'/'}
                       element={<MainPage />}/>
            </Routes>
    );
};
