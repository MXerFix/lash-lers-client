import React, { useState } from 'react'
import { add_window } from '../../api/windows'
import { errorTimeoutSet } from '../../helpers/errortimeouthelper'
import { handleSettings } from '../../helpers/stateHandler'
import { ERROR_ALERT, FETCH_TIMEOUT, GREEN_ALERT, MODAL_TIMEOUT, WARNING_ALERT } from '../../utils/consts'
import { AlertModal } from '../AlertModal/AlertModal'
import PreloaderMini from '../PreloaderMini/PreloaderMini'

export const AdminAddWindow = ({setWindows}: {setWindows: Function}) => {

  const [window, setWindow] = useState('')
  const [error, setError] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const errorHandler = (code: number) => {
    switch (code) {
      case 1: return {
        message: errorMessage,
        alertType: WARNING_ALERT
      }
      case 2: return {
        message: errorMessage,
        alertType: ERROR_ALERT
      }
      case 400: return {
        message: errorMessage,
        alertType: ERROR_ALERT
      }
      case 404: return {
        message: errorMessage,
        alertType: ERROR_ALERT
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

  const addWindowHandler = async (e: React.MouseEvent | React.ChangeEvent) => {
    setIsLoading(prev => true)
    setTimeout(async () => {
      if (window.length) {
        try {
          await add_window(window).then((response) => {
            console.log(response);
            setErrorMessage(prev => response.data.message)
            errorTimeoutSet(setError, 200, MODAL_TIMEOUT)
            setWindows((prev: any) => response.data.windows)
            setWindow(prev => '')
            return response
          })
        } catch (error: any) {
          console.log(error)
          setErrorMessage(prev => error.response.data.split('pre>')[1].split('<br>')[0])
          errorTimeoutSet(setError, error.response.status, MODAL_TIMEOUT)
        } finally {
          setIsLoading(prev => false)
        }
      } else {
        setErrorMessage('Нужно указать дату и время')
        errorTimeoutSet(setError, 1, MODAL_TIMEOUT)
        setIsLoading(prev => false)
      }
    }, FETCH_TIMEOUT);
  }

  return (
    <>
      {error != 0 && <AlertModal alertType={errorHandler(error).alertType}> {errorHandler(error).message} </AlertModal>}
      <div className='w-full'>
        <div className=' bg-333 flex flex-col rounded-lg mx-0.5 items-center h-full'>
          <input
            value={window}
            onChange={(e) => handleSettings(e, setWindow, e.target.value)}
            className='bg-333 text-white scale-125 mt-8 mb-3'
            type="datetime-local"
            name=""
            id="" />
          <p className='text-white mb-2'> {window ? window : 'Дата'} </p>
          <button
            onClick={(e) => addWindowHandler(e)}
            className='text-333 w-28 flex flex-col items-center justify-center h-10 bg-white px-6 mb-2 rounded-lg' >
            {isLoading ? <PreloaderMini className='w-6 h-6' color='#333' /> : "Добавить"}
          </button>
        </div>
      </div>
    </>
  )
}
