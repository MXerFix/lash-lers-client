import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { RootState } from '../../store/store'
import { ADMIN_ROUTE } from '../../utils/consts'
import styles from './header.css'

export const Header = () => {

  return (
    <div className={styles.header}>
      <a className='decoration-inherit' href="/"><h1 className={styles.header_logo}> LASH|LERS </h1></a>
    </div>
  )
}
