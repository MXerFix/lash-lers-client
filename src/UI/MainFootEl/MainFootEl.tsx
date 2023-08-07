import React, { useState } from 'react'
import styles from './mainfootel.css'
import { footMenuElementInterface } from '../../utils/interfaces'
import { NavLink, useLocation } from 'react-router-dom'
import { ENTRY_ROUTE } from '../../utils/consts'
import classNames from 'classnames'

export const MainFootEl = ({ children, img, onClickFN,path }: footMenuElementInterface) => {

  const [mainBlup, setMainBlup] = useState(false)

  const location = useLocation()
  

  return (
    <div onClick={(e) => {onClickFN(path, e)}} className={mainBlup ? classNames(styles.main, styles.main_blup) : styles.main}>
      <img src={img} alt="" />
      <p> {children} </p>
    </div>
  )
}
