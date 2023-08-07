import React, { useCallback, useState } from 'react'
import styles from './minifootel.css'
import { footMenuElementInterface } from '../../utils/interfaces'
import { NavLink, useNavigate } from 'react-router-dom'
import { HOME_ROUTE } from '../../utils/consts'
import classnames from 'classnames'

export const MiniFootEl = ({ children, img, path, onClickFN }: footMenuElementInterface) => {

  const navigate = useNavigate()

  const [blup, setBlup] = useState(false)

  return (
    <div onClick={(e) => {onClickFN(path, e); setBlup(prev => !prev); setTimeout(() => {setBlup(prev => !prev)}, 300) }} className={blup ? classnames(styles.main, styles.main_blup) : styles.main }>
      <div className={styles.second}>
        <div className={styles.img_32}><img src={img} alt="" /></div>
        <p> {children} </p>
      </div>
    </div>
  )
}
