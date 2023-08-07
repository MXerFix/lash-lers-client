import React, { useState } from 'react'
import { add_category } from '../../api/lashes'
import { errorTimeoutSet } from '../../helpers/errortimeouthelper'
import { handleSettings } from '../../helpers/stateHandler'
import { ERROR_ALERT, FETCH_TIMEOUT, GREEN_ALERT, MODAL_TIMEOUT, WARNING_ALERT } from '../../utils/consts'
import { AlertModal } from '../AlertModal/AlertModal'
import PreloaderMini from '../PreloaderMini/PreloaderMini'

export const AdminAddCategory = ({setCategories}: {setCategories: Function}) => {

  const [categoryValue, setCategoryValue] = useState('')
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


  const addCategoryHandler = async (e: React.MouseEvent | React.ChangeEvent) => {
    setIsLoading(prev => true)
    setTimeout(async () => {
      if (categoryValue.length) {
        try {
          await add_category(categoryValue).then((response) => {
            console.log(response);
            setErrorMessage(prev => response.data.message)
            errorTimeoutSet(setError, 200, MODAL_TIMEOUT)
            setCategories((prev: any) => response.data.categories)
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
        setErrorMessage('Нужно указать название категории')
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
          <input
            className='w-full text-333 px-2 py-1 rounded-lg mb-1 focus:outline-none'
            value={categoryValue}
            onChange={e => handleSettings(e, setCategoryValue, e.target.value)}
            name='category_value'
            type="text" />
          <button
            onClick={e => addCategoryHandler(e)}
            className='w-full h-8 bg-white flex flex-col items-center text-333 px-2 py-1 rounded-lg'>
            {isLoading ? <PreloaderMini className='w-6 h-6' color='#333' /> : "Добавить"}
          </button>
        </div>
      </div>
    </>
  )
}
