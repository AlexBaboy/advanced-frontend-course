import React, {Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import {AboutPage} from "pages/About";
import {MainPage} from "pages/Main";
import {routeConfig} from "shared/config/routeConfig/routeConfig";
import {PageLoader} from "widgets/PageLoader/PageLoader";

export const AppRouter = () => {
    return (

            <Routes>
                {Object.values(routeConfig).
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
