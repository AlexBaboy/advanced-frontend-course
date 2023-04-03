import React, {Suspense, useEffect, useState} from 'react'
import './styles/index.scss'
import { useTheme } from 'app/providers/ThemeProvider'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppRouter } from 'app/providers/router'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import {Modal} from "shared/ui/Modal/Modal";

const App = () => {
  const { theme } = useTheme()

    const [isOpen, setIsOpen] = useState(false)

  return (
      <div className={classNames('app', { hovered: true, selectable: false }, [theme, 'class-test'])}>
          <Suspense fallback={''}>
              <Navbar />

              <button onClick={() => setIsOpen(true)}>
                  toggle
              </button>
              <Modal
                  isOpen={isOpen}
                  onClose={() => setIsOpen(false)}
              />

              <div className={'content-page'}>
                  <Sidebar />
                  <AppRouter />
              </div>
          </Suspense>
      </div>
  )
}

export default App
