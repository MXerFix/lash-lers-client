import React from 'react'
import { blockInterface } from '../../utils/interfaces'
import styles from './bigblock.css'

export const BigBlock = ({children, onClickFN, path}: blockInterface) => {
  return (
    <div onClick={(e) => onClickFN(path, e)} className={styles.bigblock_wrapper}>
      {children}
    </div>
  )
}
