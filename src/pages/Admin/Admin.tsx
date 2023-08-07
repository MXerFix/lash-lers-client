import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import styles from './Admin.css'
import { get_all_users } from '../../api/user'
import { add_window, get_all_windows } from '../../api/windows'
import { AlertModal } from '../../components/AlertModal/AlertModal'
import { FootMenu } from '../../components/FootMenu/FootMenu'
import { errorTimeoutSet } from '../../helpers/errortimeouthelper'
import { UserType } from '../../store/UserStore'
import { ERROR_404, ERROR_ALERT, GREEN_ALERT, MODAL_TIMEOUT, WARNING_ALERT } from '../../utils/consts'
import { add_category, create_lash, get_all_categories, get_all_lashes } from '../../api/lashes'
import { AxiosError } from 'axios'
import { AdminLashItem } from '../../components/AdminLashItem/AdminLashItem'
import { AdminLashList } from '../../components/AdminLashList/AdminLashList'
import { AdminBtn } from '../../components/AdminBtn/AdminBtn'
import { AdminUsersList } from '../../components/AdminUsersList/AdminUsersList'
import { AdminAddLashes } from '../../components/AdminAddLashes/AdminAddLashes'
import { AdminAllWindowsList } from '../../components/AdminAllWindowsList/AdminAllWindowsList'
import { AdminAddWindow } from '../../components/AdminAddWindow/AdminAddWindow'
import { AdminAddCategory } from '../../components/AdminAddCategory/AdminAddCategory'
import { AdminLashInstruments } from '../../components/AdminLashInstruments/AdminLashInstruments'

export const Admin = () => {

  const [addWindow, setAddWindow] = useState(false)
  const [getWindows, setGetWindows] = useState(false)
  const [windows, setWindows] = useState<any[]>([])
  const [getUsers, setGetUsers] = useState(false)
  const [users, setUsers] = useState<any[]>([])
  const [lashes, setLashes] = useState<any[]>([])
  const [error, setError] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLashInstruments, setIsLashInstruments] = useState(false)
  const [categories, setCategories] = useState<any[]>([])

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

  const handleSettings = (e: React.MouseEvent | React.ChangeEvent, setState: Function, state: boolean | string | number) => {
    e.preventDefault()
    setState(state)
  }

  useEffect(() => {
    const getAllCategoriesHandler = async () => {
      try {
        await get_all_categories().then((response) => {
          setCategories(response.data.categories)
          return response
        })
      } catch (error: any) {
        if (error.response.data) {
          setErrorMessage(prev => error.response.data.split('pre>')[1].split('<br>')[0])
          errorTimeoutSet(setError, 2, MODAL_TIMEOUT)
        } else {
          setErrorMessage(prev => 'Ошибка подгрузки категорий, возможно упала база, напиши Мексу')
          errorTimeoutSet(setError, 2, MODAL_TIMEOUT)
        }
      }
    }
    const getAllWindowsHandler = async () => {
      try {
        await get_all_windows().then((response) => {
          setWindows(response.data.windows)
          return response
        })
      } catch (error: any) {
        if (error.response.data) {
          setErrorMessage(prev => error.response.data.split('pre>')[1].split('<br>')[0])
          errorTimeoutSet(setError, 2, MODAL_TIMEOUT)
        } else {
          setErrorMessage(prev => 'Ошибка подгрузки окошек, возможно упала база, напиши Мексу')
          errorTimeoutSet(setError, 2, MODAL_TIMEOUT)
        }
      }
    }
    const getAllUsersHandler = async () => {
      try {
        await get_all_users().then(({ data }) => {
          setUsers(data.users)
          return data
        })
      } catch (error: any) {
        if (error.response.data) {
          setErrorMessage(prev => error.response.data.split('pre>')[1].split('<br>')[0])
          errorTimeoutSet(setError, 2, MODAL_TIMEOUT)
        } else {
          setErrorMessage(prev => 'Ошибка подгрузки пользователей, возможно упала база, напиши Мексу')
          errorTimeoutSet(setError, 2, MODAL_TIMEOUT)
        }
      }
    }
    const getAllLashesHandler = async () => {
      try {
        await get_all_lashes().then(({ data }) => {
          setLashes(data.lashes)
          return data
        })
      } catch (error: any) {
        console.log(error);
        if (error.response.data) {
          setErrorMessage(prev => error.response.data.split('pre>')[1].split('<br>')[0])
          errorTimeoutSet(setError, 2, MODAL_TIMEOUT)
        } else {
          setErrorMessage(prev => 'Ошибка подгрузки ресничек, возможно упала база, напиши Мексу')
          errorTimeoutSet(setError, 2, MODAL_TIMEOUT)
        }
      }
    }

    getAllUsersHandler()
    getAllWindowsHandler()
    getAllLashesHandler()
    getAllCategoriesHandler()

  }, [])

  useEffect(() => {
    const getAllWindowsHandler = async () => {
      try {
        await get_all_windows().then((response) => {
          setWindows(response.data.windows)
          return response
        })
      } catch (error: any) {
        if (error.response.data) {
          setErrorMessage(prev => error.response.data.split('pre>')[1].split('<br>')[0])
          errorTimeoutSet(setError, 2, MODAL_TIMEOUT)
        } else {
          setErrorMessage(prev => 'Ошибка подгрузки окошек, возможно упала база, напиши Мексу')
          errorTimeoutSet(setError, 2, MODAL_TIMEOUT)
        }
      }
    }

    getAllWindowsHandler()

  }, [getWindows == false])

  const lashesList: any[] = []

  if (categories.length && lashes.length) {
    categories.map((category) => {
      lashesList.push({
        title: category.value,
        lashes: lashes.filter((lash) => lash.categoryId == category.id)
      })
    })
  }


  return (
    <>
      {error != 0 && <AlertModal alertType={errorHandler(error).alertType}> {errorHandler(error).message} </AlertModal>}
      <div className='flex flex-col items-center relative px-6'>
        <h2 className=' text-center m-8 text-22'> Лера рулит бизнесом </h2>
        <div className='flex flex-col justify-start items-center w-full'>
          <div className='flex flex-row items-center justify-center w-full'>
            <AdminBtn
              onClickHandler={(e) => handleSettings(e, setAddWindow, !addWindow)}
              isBlockActive={addWindow}
            >
              Добавить окошко
            </AdminBtn>
            <AdminBtn
              onClickHandler={(e) => handleSettings(e, setGetWindows, !getWindows)}
              isBlockActive={getWindows}>
              Показать все окошки
            </AdminBtn>
          </div>
          {addWindow && <AdminAddWindow setWindows={setWindows} />}
          {getWindows && <AdminAllWindowsList setWindows={setWindows} users={users} windows={windows} />}
          <AdminBtn
            onClickHandler={e => handleSettings(e, setIsLashInstruments, !isLashInstruments)}
            isBlockActive={isLashInstruments} >
            Панель ресничных инструментов
          </AdminBtn>
          {isLashInstruments && <AdminLashInstruments setCategories={setCategories} categories={categories} lashesList={lashesList} setLashes={setLashes} />}
          <div className='flex flex-row items-center justify-center w-full'>
            <AdminBtn
              onClickHandler={(e) => handleSettings(e, setGetUsers, !getUsers)}
              isBlockActive={getUsers}>
              Все клиенты
            </AdminBtn>
          </div>
          {getUsers && <AdminUsersList className='w-full' users={users} />}
        </div>
      </div>
    </>
  )
}
