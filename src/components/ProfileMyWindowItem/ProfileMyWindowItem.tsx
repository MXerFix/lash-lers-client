import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { pick_window } from '../../api/windows'
import { errorTimeoutSet } from '../../helpers/errortimeouthelper'
import { handleSettings } from '../../helpers/stateHandler'
import { RootState } from '../../store/store'
import { ERROR_ALERT, FETCH_TIMEOUT, GREEN_ALERT, MODAL_TIMEOUT, WARNING_ALERT } from '../../utils/consts'
import { AlertModal } from '../AlertModal/AlertModal'
import PreloaderMini from '../PreloaderMini/PreloaderMini'



export const ProfileMyWindowItem = ({ window, setWindows }: { window: any, setWindows: Function }) => {

  const [error, setError] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

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
      case 400: return {
        message: errorMessage,
        alertType: ERROR_ALERT
      }
    }
    return {
      message: '',
      alertType: ''
    }
  }

  const cancelWindowHandler = async (time: string, id: number) => {
    setIsLoading(prev => true)
    if (confirm("Отменить?")) {
      setTimeout(async () => {
        try {
          await pick_window(time, id, false).then((response) => {
            setErrorMessage(response.data.message)
            errorTimeoutSet(setError, response.status, MODAL_TIMEOUT)
            setTimeout(() => {
              setWindows(response.data.windows)
            }, MODAL_TIMEOUT);
            setIsVisible(prev => false)
          })
        } catch (error: any) {
          setErrorMessage(prev => error.response.data.split('pre>')[1].split('<br>')[0])
          errorTimeoutSet(setError, error.response.status, MODAL_TIMEOUT)
        } finally {
          setIsLoading(prev => false)
        }
      }, FETCH_TIMEOUT);
    } else setIsLoading(prev => false)
  }

  const user = useSelector((state: RootState) => state.user.user)

  const difference = 86376576
  const isActualForCancelling = (Date.parse(window.time) - Date.now() > difference)
  const isPast = Date.parse(window.time) < Date.now()
  const safari_time = new Date(window.time)
  return (
    <>
      <AlertModal alertType={errorHandler(error).alertType} children={errorHandler(error).message} error={error} />
      <div className={`${!isVisible && 'hidden'} flex flex-col items-center bg-white text-333 rounded-lg py-2 px-3 mb-2`} key={window.id}>
        {/* <p> ID: {window.id} </p> */}
        <p className='text-center'> Дата: {safari_time.toLocaleString().slice(0, 17)} </p>
        {isPast ? <span className='bg-red-500 px-2 py-1 mb-1 rounded text-white text-center text-14'> Прошедшая запись </span> : (isActualForCancelling && <span className='bg-green-400 px-2 py-1 mb-1 mt-1 rounded text-white text-center text-14'> Будущая запись </span>)}
        {isActualForCancelling && !isPast ? (
          <button
            onClick={e => cancelWindowHandler(window.time, user.id)}
            className='bg-red-500 w-36 px-2 py-1 rounded text-white text-center text-12 flex flex-col items-center justify-center' >
            {isLoading ? <PreloaderMini className='w-6 h-6' /> : "Отменить запись"}
          </button>
        ) : (
          (!isPast &&
            <span className='text-12 font-medium text-center bg-yellow-400 text-333 rounded-lg py-1 px-2'>
              Запись ближе, чем за 24 часа, можно отменить только лично
            </span>
          )
        )}
      </div>
    </>
  )
}
