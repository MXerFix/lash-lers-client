import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import { ERROR_ALERT, GREEN_ALERT, WARNING_ALERT } from '../../utils/consts'

type AlertModalType = {
  alertType: string
  children: any
  error?: number
}

export const AlertModal = ({ alertType, children, error }: AlertModalType) => {

  const modal_ref = document.querySelector('#modal_root')
  if (!modal_ref) {
    console.log('false')
    return <></>
  }

  const PortalModal = ReactDOM.createPortal(<AlertModalPortal alertType={alertType}> {children} </AlertModalPortal>, modal_ref)

  return (
    <>
      { error != 0 && PortalModal}
    </>
  )
}

const AlertModalPortal = ({ alertType, children }: AlertModalType) => {

  const alertTypeBackgroundHandler = (type: string) => {
    switch (type) {
      case WARNING_ALERT: return 'bg-yellow-400 text-333'
      case ERROR_ALERT: return 'bg-red-500 text-white'
      case GREEN_ALERT: return 'bg-green-400 text-white'
    }
  }

  return (
    <div className='fixed flex flex-col top-0 items-center w-full h-max'>
      <span className={`${alertTypeBackgroundHandler(alertType)} z-10 text-center w-80 p-1 rounded top-32 relative modal-anim`}>
        {children}
      </span>
    </div>
  )
}
