import React, {Suspense, useEffect, useState} from 'react'

import { useTheme } from 'app/providers/ThemeProvider'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppRouter } from 'app/providers/router'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import {useDispatch} from "react-redux";
import {userActions} from "entities/User";

const App = () => {
  const { theme } = useTheme()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userActions.initAuthData)
    }, [])

  return (
      <div className={classNames('app', { hovered: true, selectable: false }, [theme])}>
          <Suspense fallback={''}>
              <Navbar />

              <div className={'content-page'}>
                  <Sidebar />
                  <AppRouter />
              </div>
          </Suspense>
      </div>
  )
}

export default App
