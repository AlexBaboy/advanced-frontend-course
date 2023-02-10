import React, {Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import {AboutPage} from "pages/About";
import {MainPage} from "pages/Main";
import {routeConfig} from "shared/config/routeConfig/routeConfig";

export const AppRouter = () => {
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <Routes>
                {Object.values(routeConfig).
                    map(({path, element}) => (
                        <Route
                            key={path}
                            path={path}
                            element={element}
                        />
                    ))
                }
                <Route path={'/about'}
                       element={<AboutPage />}/>
                <Route path={'/'}
                       element={<MainPage />}/>
            </Routes>
        </Suspense>
    );
};
