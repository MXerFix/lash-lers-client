import React, { useCallback } from 'react'
import styles from './footmenu.css'
import { MainFootEl } from '../../UI/MainFootEl/MainFootEl'
import { MiniFootEl } from '../../UI/MiniFootEl/MiniFootEl'
import home_icon from '../../public/img/homeic.svg'
import contactus_icon from '../../public/img/contactusic.svg'
import entry_icon from '../../public/img/entryic.svg'
import portfolio_icon from '../../public/img/portfolioic.svg'
import profile_icon from '../../public/img/profileic.svg'
import { useNavigate } from 'react-router-dom'
import { ABOUT_ROUTE, AUTH_ROUTE, ENTRY_ROUTE, HOME_ROUTE, PORTFOLIO_ROUTE, PROFILE_ROUTE, SUPPORT_ROUTE } from '../../utils/consts'
import { RootState, store } from '../../store/store'
import { useSelector } from 'react-redux'

export const FootMenu = () => {

  const IS_AUTH = useSelector((state: RootState) => state.user.isLogin)

  const navigate = useNavigate()

  const onClickFN = useCallback((path: string, e: Event) => {
    e.preventDefault()
    navigate(path)
  }, [IS_AUTH])

  return (
      <div className={styles.main}>
        <MiniFootEl onClickFN={onClickFN} path={HOME_ROUTE} img={home_icon}> Главная </MiniFootEl>
        <MiniFootEl onClickFN={onClickFN} path={SUPPORT_ROUTE} img={contactus_icon}> Связаться </MiniFootEl>
        <MainFootEl onClickFN={onClickFN} path={ENTRY_ROUTE} img={entry_icon}> Записаться </MainFootEl>
        <MiniFootEl onClickFN={onClickFN} path={PORTFOLIO_ROUTE} img={portfolio_icon}> Портфолио </MiniFootEl>
        <MiniFootEl onClickFN={onClickFN} path={IS_AUTH ? PROFILE_ROUTE : AUTH_ROUTE} img={profile_icon}> Профиль </MiniFootEl>
      </div>
  )
}
