import React, { useState } from 'react'
import { delete_window, pick_window } from '../../api/windows'
import { errorTimeoutSet } from '../../helpers/errortimeouthelper'
import { UserType } from '../../store/UserStore'
import { ERROR_ALERT, FETCH_TIMEOUT, GREEN_ALERT, MODAL_TIMEOUT, WARNING_ALERT } from '../../utils/consts'
import { AlertModal } from '../AlertModal/AlertModal'
import PreloaderMini from '../PreloaderMini/PreloaderMini'

type windowItemType = {
  time: string
  user: any
  window: any
  setWindows: Function
}

export const AdminAllWindowsItem = ({ time, setWindows, window, user }: windowItemType) => {

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingCancel, setIsLoadingCancel] = useState(false)
  const [error, setError] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const [isVisible, setIsVisible] = useState(true)

  const isPast = Date.parse(window.time) < Date.now()

  const errorHandler = (code: number) => {
    switch (code) {
      case 1: return {
        message: errorMessage,
        alertType: ERROR_ALERT
      }
      case 2: return {
        message: errorMessage,
        alertType: WARNING_ALERT
      }
      case 200: return {
        message: errorMessage,
        alertType: GREEN_ALERT
      }
    }
    return {
      message: '',
      alertType: ''
    }
  }

  const deleteWindowHandler = async (id: number) => {
    if (confirm("Точно удалить?")) {
      setIsLoading(prev => true)
      setTimeout(async () => {
        try {
          await delete_window(id).then((response) => {
            console.log(response.data);
            setErrorMessage(response.data.message)
            errorTimeoutSet(setError, response.status, MODAL_TIMEOUT)
            setIsVisible(prev => false)
            setTimeout(() => {
              setWindows(response.data.windows)
            }, MODAL_TIMEOUT);
          })
        } catch (error: any) {
          console.log(error)
          setErrorMessage(prev => error.response.data.split('pre>')[1].split('<br>')[0])
          errorTimeoutSet(setError, error.response.status, MODAL_TIMEOUT)
        } finally {
          setIsLoading(prev => false)
        }
      }, FETCH_TIMEOUT);
    }
  }

  const cancelWindowHandler = async (time: string, id: number) => {
    setIsLoadingCancel(prev => true)
    if (confirm("Отменить?")) {
      setTimeout(async () => {
        try {
          await pick_window(time, id, false).then((response) => {
            console.log(response)
            setErrorMessage(response.data.message)
            errorTimeoutSet(setError, response.status, MODAL_TIMEOUT)
            setWindows(response.data.all_windows)
          })
        } catch (error: any) {
          setErrorMessage(prev => error.response.data.split('pre>')[1].split('<br>')[0])
          errorTimeoutSet(setError, error.response.status, MODAL_TIMEOUT)
        } finally {
          setIsLoadingCancel(prev => false)
        }
      }, FETCH_TIMEOUT);
    } else setIsLoadingCancel(prev => false)
  }



  return (
    <>
      <AlertModal alertType={errorHandler(error).alertType} children={errorHandler(error).message} error={error} />
      <div className={`bg-333 ${!isVisible && 'hidden'} p-4 w-full rounded-lg mx-0.5 text-white mb-1`} key={window.id}>
        {/* <p> ID: {window.id} </p> */}
        <p> Окно: {time} </p>
        {isPast && <span className='bg-red-500 py-1 px-4 rounded text-white'> Прошедшее </span>}
        <p>{window.isPicked ? '' : 'Не занято'} </p>
        {window.isPicked && user ? <div>
          <p> Занято пользователем: </p>
          <p> ID: {user.id} </p>
          <p> Имя: {user.name} </p>
          {user.email && <p> Почта: <span className='text-14'>{user.email}</span> </p>}
          <p> Телефон: {user.tel} </p>
        </div> : <></>}
        <div className='flex flex-row items-center mt-1'>
          {!isPast && window.isPicked && <button onClick={e => cancelWindowHandler(window.time, user.id)} className={`bg-yellow-400 text-333 text-14 flex flex-col items-center justify-center w-40 py-1 px-2 rounded mt-1 mr-1`}> {isLoadingCancel ? <PreloaderMini className='w-6 h-6' /> : "Отменить"} </button>}
          {!isPast && <button onClick={e => deleteWindowHandler(window.id)} className={`bg-red-500 text-14 flex flex-col items-center justify-center w-40 py-1 px-2 rounded mt-1`}> {isLoading ? <PreloaderMini className='w-6 h-6' /> : "Удалить"} </button>}
        </div>
      </div>
    </>
  )
}
