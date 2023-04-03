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
              >
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusantium, assumenda commodi consequatur debitis deleniti deserunt dignissimos dolor dolore ea eum expedita fuga illum ipsam labore molestias necessitatibus nihil nostrum nulla officia quos rem sit sunt temporibus veritatis. Blanditiis consequuntur culpa explicabo minus nam non odio officia optio quidem repellendus.
              </Modal>

              <div className={'content-page'}>
                  <Sidebar />
                  <AppRouter />
              </div>
          </Suspense>
      </div>
  )
}

export default App
