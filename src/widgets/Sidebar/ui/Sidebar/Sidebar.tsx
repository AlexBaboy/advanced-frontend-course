import {classNames} from 'shared/lib/classNames/classNames'
import React, {memo, useMemo, useState} from 'react'
import {ThemeSwitcher} from 'widgets/ThemeSwitcher'
import {LangSwitcher} from 'widgets/Sidebar'
import {Button, ButtonSize, ButtonTheme} from "shared/ui/Button/Button";
import cls from './Sidebar.module.scss'
import {SidebarItem} from "../SidebarItem/SidebarItem";
import {useSelector} from "react-redux";
import {getSideBarItems} from "../../model/selectors/getSideBarItems";

interface SidebarProps {
  className?: string
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const sidebarItemsList = useSelector(getSideBarItems)

  const onToggle = () => {
    setCollapsed(prev => !prev)
  }

  const itemsList = useMemo(() => sidebarItemsList.map((item) => (
      <SidebarItem
          item={item}
          collapsed={collapsed}
          key={item.path}
      />
  )),[collapsed, sidebarItemsList])

  return (
      <menu
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
              {itemsList}
          </div>

          <div className={cls.switchers}>
              <ThemeSwitcher />
              <LangSwitcher
                  short={collapsed}
                  className={cls.lang}
              />
          </div>
      </menu>
  )
})
