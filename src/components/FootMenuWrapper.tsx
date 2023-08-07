import React, { useEffect, useState } from "react"
import ReactDOM from 'react-dom'
import { Outlet, useLocation } from "react-router-dom"
import { FootMenu } from "./FootMenu/FootMenu"
import { useTransition, animated, useSpringRef } from '@react-spring/web'
import { check } from "../api/auth"
import { useDispatch } from "react-redux"
import { loginUser } from "../store/UserStore"
import Preloader from "./Preloader/Preloader"
import { ERROR_ALERT, MODAL_TIMEOUT } from "../utils/consts"
import { AlertModal } from "./AlertModal/AlertModal"
import { errorTimeoutSet } from "../helpers/errortimeouthelper"

export const FootMenuWrapper = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useDispatch()

  const errorHandler = (code: number) => {
    switch (code) {
      case 1: return {
        message: errorMessage,
        alertType: ERROR_ALERT
      }
      case 500: return {
        message: errorMessage,
        alertType: ERROR_ALERT
      }
      case 404: return {
        message: errorMessage,
        alertType: ERROR_ALERT
      }
      case 400: return {
        message: errorMessage,
        alertType: ERROR_ALERT
      }
      case 403: return {
        message: errorMessage,
        alertType: ERROR_ALERT
      }
    }
    return {
      message: '',
      alertType: ''
    }
  }

  useEffect(() => {
    const checkUserAuthHandler = async () => {
      setIsLoading(prev => true)
      const token = localStorage.getItem('token')
      if (token) {
        try {
          await check().then((userData: any) => {
            dispatch(loginUser({ name: userData.name, email: userData.email, tel: userData.tel, role: userData.role, id: userData.id }))
          })
        } catch (error: any) {
          if (error.response.data.length) {
            console.log(error)
            setErrorMessage(prev => error.response.data.split('pre>')[1].split('<br>')[0])
            errorTimeoutSet(setError, error.response.status, MODAL_TIMEOUT)
            if (error.response.status == 404) {
              localStorage.removeItem('token')
            }
          } else {
            setErrorMessage('Ошибка сервера, походу сервер прилёг')
            errorTimeoutSet(setError, 1, MODAL_TIMEOUT)
          }
        } finally {
          setIsLoading(prev => false)
        }
      } else {
        setIsLoading(prev => false)
      }
    }

    checkUserAuthHandler()

  }, [])

  const location = useLocation()
  const ref = useSpringRef()
  const transitions = useTransition(location.pathname, {
    from: { opacity: 0, transform: 'scale(1.05)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    exitBeforeEnter: true,
  })

  const modal_root = document.querySelector('#modal_root')
  if (!modal_root) return <></>
  const PreloaderPortal = ReactDOM.createPortal(<Preloader />, modal_root)

  if (isLoading) return (
    <>
      {PreloaderPortal}
    </>
  )

  return (
    <div className="relative">
      {error != 0 && <AlertModal alertType={errorHandler(error).alertType}> {errorHandler(error).message} </AlertModal>}
      {transitions((style, item) => (
        <animated.div style={style} >
          <Outlet />
        </animated.div>
      ))}
      <FootMenu />
    </div>
  )
}
