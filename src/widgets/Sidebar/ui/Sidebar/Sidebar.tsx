import {classNames} from 'shared/lib/classNames/classNames'
import React, {useState} from 'react'
import {ThemeSwitcher} from 'widgets/ThemeSwitcher'
import {LangSwitcher} from 'widgets/Sidebar'
import {Button, ButtonSize, ButtonTheme} from "shared/ui/Button/Button";
import {useTranslation} from "react-i18next";
import cls from './Sidebar.module.scss'
import {SideBarItemsList} from "../../model/items";
import {SidebarItem} from "../SidebarItem/SidebarItem";

interface SidebarProps {
  className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)

    const {t} = useTranslation()

  const onToggle = () => {
    setCollapsed(prev => !prev)
  }

  return (
      <div
          data-testid={'sidebar'}
          className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}>
          <Button
              data-testid={'sidebar-toggle'}
              onClick={onToggle}
              className={cls.collapseBtn}
              theme={ButtonTheme.BACKGROUND_INVERTED}
              square
              size={ButtonSize.L}
          >
              {collapsed ? '>' : '<'}
          </Button>

          <div className={cls.items}>
              {SideBarItemsList.map((item) => (
                <SidebarItem
                    item={item}
                    collapsed={collapsed}
                    key={item.path}
                />
              ))}
          </div>

          <div className={cls.switchers}>
              <ThemeSwitcher />
              <LangSwitcher
                  short={collapsed}
                  className={cls.lang}
              />
          </div>
      </div>
  )
}
