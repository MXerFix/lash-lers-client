import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { check } from '../../api/auth'
import { BigBlock } from '../../components/BigBlock/BigBlock'
import { FootMenu } from '../../components/FootMenu/FootMenu'
import { MiniBlock } from '../../components/MiniBlock/MiniBlock'
import { SocialsBox } from '../../components/SocialsBox/SocialsBox'
import { RootState, store } from '../../store/store'
import { loginUser } from '../../store/UserStore'
import { ABOUT_ROUTE, AUTH_ROUTE, ENTRY_ROUTE, PORTFOLIO_ROUTE, PRICELIST_ROUTE, PROFILE_ROUTE } from '../../utils/consts'
import styles from './home.css'


export const Home = () => {

  const IS_AUTH = useSelector((state: RootState) => state.user.isLogin)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onClickFN = useCallback((path: string, e: Event) => {
    e.preventDefault()
    navigate(path)
  }, [])

  return (
    <div className={styles.home_main}>
      <div className={styles.home_row__block}>
        <MiniBlock onClickFN={onClickFN} path={ENTRY_ROUTE} >Запись</MiniBlock>
        <MiniBlock onClickFN={onClickFN} path={PRICELIST_ROUTE} >Прайс-лист</MiniBlock>
      </div>
      <div className={styles.home_row__block}>
        <BigBlock onClickFN={onClickFN} path={PORTFOLIO_ROUTE} >
          Примеры работ
        </BigBlock>
      </div>
      <div className={styles.home_row__block}>
        <MiniBlock onClickFN={onClickFN} path={ABOUT_ROUTE} > Обо мне </MiniBlock>
        <SocialsBox />
      </div>
      <div className={styles.home_row__block}>
        <BigBlock onClickFN={onClickFN} path={IS_AUTH ? PROFILE_ROUTE : AUTH_ROUTE} >
          { IS_AUTH ? "Профиль" : "Войти в профиль" }
        </BigBlock>
      </div>
    </div>
  )
}
