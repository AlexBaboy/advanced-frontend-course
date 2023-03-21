import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LangSwitcher.module.scss'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'

interface LangSwitcherProps {
  className?: string
}

export const LangSwitcher: ({ className }: LangSwitcherProps) => JSX.Element = ({ className }: LangSwitcherProps): JSX.Element => {
  const { t, i18n } = useTranslation()

  const toggle = (): void => {
    void i18n.changeLanguage(
      i18n.language === 'ru'
        ? 'en'
        : 'ru')
  }

  return (
      <Button
                theme={ButtonTheme.CLEAR}
                onClick={toggle}
                className={classNames(
                  cls.LangSwitcher,
                  {},
                  [className]
                )}>
          {t('Язык')}
      </Button>
  )
}
