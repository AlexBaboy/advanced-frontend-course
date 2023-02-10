import React, {Suspense, useContext, useState} from 'react';
import {Routes, Route, Link} from 'react-router-dom'
import './styles/index.scss'
import {useTheme} from "app/providers/ThemeProvider";
import {classNames} from "shared/lib/classNames/classNames";
import {AppRouter} from "app/providers/router";

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

            <AppRouter />

        </div>
    );
};

export default App
