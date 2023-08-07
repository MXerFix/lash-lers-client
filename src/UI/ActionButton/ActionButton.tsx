import classNames from 'classnames'
import React, { MouseEventHandler } from 'react'
import PreloaderMini from '../../components/PreloaderMini/PreloaderMini'

type actionButtonType = {
  children: string
  className: string
  isLoading: boolean
  onClick: MouseEventHandler
}

export const ActionButton = ({children, className, isLoading, onClick}: actionButtonType) => {
  return (
    <button onClick={onClick} className={classNames('', className)} >
      {isLoading ? <PreloaderMini className='w-6 h-6' /> : children}
    </button>
  )
}
