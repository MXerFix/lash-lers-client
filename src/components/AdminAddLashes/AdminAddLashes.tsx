import React, { useState } from 'react'
import { create_lash } from '../../api/lashes'
import { errorTimeoutSet } from '../../helpers/errortimeouthelper'
import { handleSettings } from '../../helpers/stateHandler'
import { ERROR_ALERT, FETCH_TIMEOUT, GREEN_ALERT, MODAL_TIMEOUT, WARNING_ALERT } from '../../utils/consts'
import { AlertModal } from '../AlertModal/AlertModal'
import PreloaderMini from '../PreloaderMini/PreloaderMini'

type AdminAddLashesType = {
  categories: any[]
  setLashes: Function
}

export const AdminAddLashes = ({ categories, setLashes }: AdminAddLashesType) => {

  const [lashValue, setLashValue] = useState('')
  const [lashPrice, setLashPrice] = useState(null)
  const [lashCategory, setLashCategory] = useState('default')
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

  const addLashTypeHandler = async (e: React.MouseEvent | React.ChangeEvent) => {
    setIsLoading(prev => true)
    setTimeout(async () => {
      if (lashCategory.length && lashCategory != 'default' && lashValue.length && lashPrice !== null) {
        try {
          await create_lash(lashValue, '', '', lashPrice, lashCategory).then((response) => {
            console.log(response);
            setErrorMessage(prev => response.data.message)
            errorTimeoutSet(setError, 200, MODAL_TIMEOUT)
            setLashes((prev: any) => response.data.lashes)
            setLashPrice(prev => null)
            setLashValue(prev => '')
            setLashCategory(prev => 'default')
            return response
          })
        } catch (error: any) {
          console.log(error)
          if (error.response.data) {
            setErrorMessage(prev => error.response.data.split('pre>')[1].split('<br>')[0])
            errorTimeoutSet(setError, error.response.status, MODAL_TIMEOUT)
          } else {
            setErrorMessage(prev => 'Что-то пошло не так')
            errorTimeoutSet(setError, 2, MODAL_TIMEOUT)
          }
        } finally {
          setIsLoading(prev => false)
        }
      } else {
        setErrorMessage('Нужно заполнить все поля')
        errorTimeoutSet(setError, 1, MODAL_TIMEOUT)
        setIsLoading(prev => false)
      }
    }, FETCH_TIMEOUT);
  }


  return (
    <>
      {error != 0 && <AlertModal alertType={errorHandler(error).alertType}> {errorHandler(error).message} </AlertModal>}
      <div className='flex flex-col bg-333 items-start rounded-lg w-full p-4'>
        <div className='flex flex-col items-start w-full text-white'>
          <label htmlFor=""> Категория </label>
          <select value={lashCategory} className='w-full py-1 px-2 rounded-lg text-333' onChange={e => handleSettings(e, setLashCategory, e.target.value)} name="" id="">
            <option value="default"> Категория... </option>
            {categories.map(({ value }) => {
              return (
                <option key={value} value={value}> {value} </option>
              )
            })}
          </select>
          <label htmlFor="">Тип ресничек (работы) </label>
          <input
            className='w-full text-333 px-2 py-1 rounded-lg focus:outline-none'
            value={lashValue}
            onChange={e => handleSettings(e, setLashValue, e.target.value)}
            name='lash_value'
            type="text" />
        </div>
        <div className='flex flex-col items-start w-full text-white'>
          <label htmlFor="">Стоимость</label>
          <input
            value={lashPrice === null ? 0 : lashPrice}
            className='w-full text-333 px-2 py-1 rounded-lg focus:outline-none'
            onChange={e => handleSettings(e, setLashPrice, Number(e.target.value))}
            type="number" />
        </div>
        <button
          onClick={e => addLashTypeHandler(e)}
          className='w-full bg-white h-8 flex flex-col items-center text-333 px-2 py-1 rounded-lg mt-2'>
          {isLoading ? <PreloaderMini className='w-6 h-6' color='#333' /> : "Добавить"}
        </button>
        {/* <input name='lash_bend' type="text" />
                  <input name='lash_length' type="text" /> */}
      </div>
    </>
  )
}
