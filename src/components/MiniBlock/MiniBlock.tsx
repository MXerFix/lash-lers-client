import React from 'react'
import { blockInterface } from '../../utils/interfaces'
import styles from './miniblock.css'

export const MiniBlock = ({children, onClickFN, path}: blockInterface) => {
  return (
    <div onClick={(e) => onClickFN(path, e)} className={styles.miniblock_wrapper}>
      {children}
    </div>
  )
}
