import React, { useState } from 'react'
import { delete_lash, setting_lash } from '../../api/lashes'
import { errorTimeoutSet } from '../../helpers/errortimeouthelper'
import { handleSettings } from '../../helpers/stateHandler'
import { ERROR_ALERT, FETCH_TIMEOUT, GREEN_ALERT, MODAL_TIMEOUT, WARNING_ALERT } from '../../utils/consts'
import { AlertModal } from '../AlertModal/AlertModal'
import PreloaderMini from '../PreloaderMini/PreloaderMini'

export const AdminLashItem = ({ lash, setLashes }: { lash: any, setLashes: Function }) => {

  const [isSettingsOpened, setIsSettingsOpened] = useState(false)
  const [newValue, setNewValue] = useState(lash.value)
  const [newPrice, setNewPrice] = useState(lash.price)
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const [error, setError] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')

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

  const settingLashHandler = async (e: React.MouseEvent, value: string, price: number) => {
    setIsLoading(prev => true)
    setTimeout(async () => {
      if (value.length && (value != lash.value || price != lash.price ) ) {
        try {
          await setting_lash(value, price, lash.id).then(({ data }) => {
            setErrorMessage(data.message)
            setLashes(data.lashes)
            errorTimeoutSet(setError, 200, MODAL_TIMEOUT)
            handleSettings(e, setIsSettingsOpened, false)
            return data
          })
        } catch (error: any) {
          if (error.response.data) {
            setErrorMessage(prev => error.response.data.split('pre>')[1].split('<br>')[0])
            errorTimeoutSet(setError, error.response.status, MODAL_TIMEOUT)
          } else {
            setErrorMessage(prev => 'Что-то пошло не так')
            errorTimeoutSet(setError, 1, MODAL_TIMEOUT)
          }
        } finally {
          setIsLoading(prev => false)
        }
      } else if (value == lash.value && price == lash.price ) {
        setErrorMessage(prev => 'Кажется, ничего не изменилось')
        errorTimeoutSet(setError, 2, MODAL_TIMEOUT)
        setIsLoading(prev => false)
      } else {
        setErrorMessage(prev => 'Нельзя изменить название на пустую строку')
        errorTimeoutSet(setError, 2, MODAL_TIMEOUT)
        setIsLoading(prev => false)
      }
    }, FETCH_TIMEOUT);
  }

  const deleteLashHandler = async (e: React.MouseEvent) => {
    setIsLoading(prev => true)
    if (confirm("Точно удалить?")) {
      setTimeout(async () => {
        try {
          await delete_lash(lash.id).then(({ data }) => {
            setErrorMessage(data.message)
            errorTimeoutSet(setError, 200, MODAL_TIMEOUT)
            setIsVisible(prev => false)
            setTimeout(() => {
              setLashes(data.lashes)
            }, MODAL_TIMEOUT);
            handleSettings(e, setIsSettingsOpened, false)
            return data
          })
        } catch (error: any) {
          if (error.response.data) {
            setErrorMessage(prev => error.response.data.split('pre>')[1].split('<br>')[0])
            errorTimeoutSet(setError, error.response.status, MODAL_TIMEOUT)
          } else {
            setErrorMessage(prev => 'Что-то пошло не так')
            errorTimeoutSet(setError, 1, MODAL_TIMEOUT)
          }
        } finally {
          setIsLoading(prev => false)
        }
      }, FETCH_TIMEOUT);
    } else {
      setIsLoading(prev => false)
    }
  }

  return (
    <>
      {error != 0 && <AlertModal alertType={errorHandler(error).alertType}> {errorHandler(error).message} </AlertModal>}
      <div className={`bg-333 ${isVisible ? '' : 'hidden'} flex flex-row items-center justify-between w-full rounded-lg text-white p-2 mb-2`}>
        <div>
          {isSettingsOpened ? (
            <div>
              <input className='text-333 w-full py-1 px-1 mb-1 rounded' value={newValue} onChange={e => handleSettings(e, setNewValue, e.target.value)} type="text" />
              <input className='text-333 w-full py-1 px-1 rounded ' value={newPrice} onChange={e => handleSettings(e, setNewPrice, e.target.value)} type="number" />
            </div>
          ) : (
            <div>
              <p className='text-16 font-semibold'> {lash.value} </p>
              <p className='text-16 font-semibold'> {lash.price} </p>
            </div>
          )
          }
        </div >
        <div className='flex flex-col items-end h-max'>
          {isSettingsOpened && (
            <button onClick={e => settingLashHandler(e, newValue, newPrice)} className='bg-green-400 rounded-lg w-11/12 flex flex-col items-center justify-center text-white px-1 h-full ml-2 py-1.5 mb-1'>
              {isLoading ? <PreloaderMini className='w-6 h-6' color='#333' /> : "Подтвердить"}
            </button>
          )}
          {!isSettingsOpened && (
            <button onClick={e => deleteLashHandler(e)} className='bg-red-500 w-11/12 flex flex-col items-center justify-center rounded-lg text-white px-1 h-full ml-2 py-1.5 mb-1'>
              {isLoading ? <PreloaderMini className='w-6 h-6' /> : "Удалить"}
            </button>
          )}
          <button
            onClick={e => handleSettings(e, setIsSettingsOpened, !isSettingsOpened)}
            className={`${isSettingsOpened ? 'bg-red-500 text-white' : 'bg-yellow-400 text-333'} w-11/12 rounded-lg px-1 h-full ml-2 py-1.5`}>
            {isSettingsOpened ? 'Отменить' : 'Изменить'}
          </button>
        </div>
      </div >
    </>
  )
}
