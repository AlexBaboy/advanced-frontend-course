import React, {Suspense, useContext, useState} from 'react';
import {Routes, Route, Link} from 'react-router-dom'
import './styles/index.scss'
import {useTheme} from "app/providers/ThemeProvider";
import {classNames} from "shared/lib/classNames/classNames";
import {AppRouter} from "app/providers/router";
import {Navbar} from "widgets/Navbar";

const App = () => {

    const {theme} = useTheme()

    return (
        <div className={classNames('app',
                                {hovered: true, selectable: false},
                            [theme, 'class-test'])}>

            <Navbar />

            <AppRouter />

        </div>
    );
};

export default App
