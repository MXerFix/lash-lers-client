import classNames from 'classnames'
import React, { MouseEventHandler } from 'react'
import styles from '../../pages/Admin/Admin.css'

type AdminBtnType = {
  onClickHandler: MouseEventHandler<HTMLButtonElement>,
  isBlockActive: boolean,
  children: string,
  children_true?: string
}

export const AdminBtn = ({ onClickHandler, isBlockActive, children, children_true }: AdminBtnType) => {
  return (
    <button
      onClick={onClickHandler}
      className={classNames(styles.service_button, (isBlockActive ? styles.active : ''))}>
      {isBlockActive ? (children_true ? children_true : "Закрыть") : children}
    </button>
  )
}
