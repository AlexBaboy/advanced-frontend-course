import React, {Suspense, useContext, useState} from 'react';
import {Routes, Route, Link} from 'react-router-dom'
import './styles/index.scss'
import {AboutAsync} from "./pages/About/AboutAsync";
import {MainAsync} from "./pages/Main/MainAsync";
import {useTheme} from "./theme/useTheme";
import {classNames} from "./helpers/classNames/classNames";

const App = () => {

    const {theme, toggleTheme} = useTheme()

    return (
        <div className={classNames('app',
                                {hovered: true, selectable: false},
                            [theme, 'class-test'])}>

            <div>
                <button onClick={toggleTheme}>toggleTheme</button>
            </div>

            <Link to={'/'}>Main page</Link>
            <Link to={'/about'}>About page</Link>

            <Suspense fallback={<div>Загрузка...</div>}>
                <Routes>
                    <Route path={'/about'}
                           element={<AboutAsync />}/>
                    <Route path={'/'}
                           element={<MainAsync />}/>
                </Routes>
            </Suspense>

        </div>
    );
};

export default App
