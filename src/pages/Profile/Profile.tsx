import { AxiosError } from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { change_email, change_name } from '../../api/user'
import { get_my_windows } from '../../api/windows'
import { AlertModal } from '../../components/AlertModal/AlertModal'
import { FootMenu } from '../../components/FootMenu/FootMenu'
import PreloaderMini from '../../components/PreloaderMini/PreloaderMini'
import { ProfileMyWindowItem } from '../../components/ProfileMyWindowItem/ProfileMyWindowItem'
import { ProfileMyWindows } from '../../components/ProfileMyWindows/ProfileMyWindows'
import { errorTimeoutSet } from '../../helpers/errortimeouthelper'
import { RootState } from '../../store/store'
import { logoutUser, setUserEmail, setUserName } from '../../store/UserStore'
import { ADMIN_ROUTE, ENTRY_ROUTE, ERROR_ALERT, FETCH_TIMEOUT, GREEN_ALERT, MODAL_TIMEOUT, WARNING_ALERT } from '../../utils/consts'

export const Profile = () => {

  const isAdmin = useSelector((state: RootState) => state.user.user.role == 'ADMIN')
  const user = useSelector((state: RootState) => state.user.user)
  const dispatch = useDispatch()

  const [isLoadingLogout, setIsLoadingLogout] = useState(false)
  const [myWindows, setMyWindows] = useState<any[]>([])
  const [changeNameInput, setChangeNameInput] = useState<boolean>(false)
  const [changeEmailInput, setChangeEmailInput] = useState<boolean>(false)
  const [newName, setNewName] = useState(user.name)
  const [newEmail, setNewEmail] = useState(user.email)
  const [error, setError] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')
  const inputRef = useRef(null)

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
        message: 'Server ' + errorMessage,
        alertType: ERROR_ALERT
      }
    }
    return {
      message: '',
      alertType: ''
    }
  }

  const logoutHandler = (e: React.MouseEvent) => {
    setIsLoadingLogout(prev => true)
    e.preventDefault()
    setTimeout(() => {
      dispatch(logoutUser())
      localStorage.removeItem('token')
      setIsLoadingLogout(prev => false)
    }, FETCH_TIMEOUT);
  }

  useEffect(() => {
    const getMyWindowsHandler = async (id: number) => {
      try {
        await get_my_windows(id)
          .then(({ data }) => {
            setMyWindows(data.windows)
          })
      } catch (error) {
        setErrorMessage('Ошибка подгрузки данных о записях')
        errorTimeoutSet(setError, 1, MODAL_TIMEOUT)
      }
    }
    getMyWindowsHandler(user.id)
  }, [])

  const changeNameHandler = async (name: string) => {
    if (name != user.name) {
      try {
        await change_name(name, user.id).then(() => {
          dispatch(setUserName({ name }))
          setChangeNameInput(prev => false)
          setErrorMessage('Профиль успешно изменен')
          errorTimeoutSet(setError, 200, MODAL_TIMEOUT)
        })
      } catch (error: any) {
        const error_status = error.response.status
        setErrorMessage(prev => error.response.data.split('pre>')[1].split('<br>')[0])
        errorTimeoutSet(setError, error_status, MODAL_TIMEOUT)
      } finally {

      }
    } else {
      setErrorMessage('Кажется, ничего не изменилось')
      errorTimeoutSet(setError, 2, MODAL_TIMEOUT)
    }
  }

  const changeEmailHandler = async (email: string) => {
    if (email != user.email) {
      try {
        await change_email(email, user.id).then(() => {
          dispatch(setUserEmail({ email }))
          setChangeEmailInput(prev => false)
          setErrorMessage('Профиль успешно изменен')
          errorTimeoutSet(setError, 200, MODAL_TIMEOUT)
        })
      } catch (error: any) {
        console.log(error)
        const error_status = error.response.status
        setErrorMessage(prev => error.response.data.split('pre>')[1].split('<br>')[0])
        errorTimeoutSet(setError, error_status, MODAL_TIMEOUT)
        setNewEmail('')
      } finally {

      }
    } else {
      setErrorMessage('Кажется, ничего не изменилось')
      errorTimeoutSet(setError, 2, MODAL_TIMEOUT)
    }
  }


  return (
    <div className='flex flex-col items-center px-6 relative pb-8'>
      {error != 0 && <AlertModal alertType={errorHandler(error).alertType}> {errorHandler(error).message} </AlertModal>}
      <h2 className='text-26 my-4'> Профиль </h2>
      {isAdmin && <NavLink className=' bg-yellow-400 py-2 px-4 text-333 text-center mb-4 rounded-lg ' to={`../${ADMIN_ROUTE}`}> ADMIN PANEL </NavLink>}
      <div className='bg-333 py-4 px-6 rounded-lg w-full mb-4'>
        <h4 className='text-center text-white mb-2 text-18'> Мои данные </h4>
        <span className='bg-white text-333 p-1 mb-1 block font-medium text-16 rounded w-max'>Имя</span>
        <p className='my-2 bg-white px-4 py-2 rounded-lg'>
          {changeNameInput ?
            <span className='w-full'>
              <input className='focus:outline-none rounded-lg py-1 px-2 my-1 border-2 border-333 border-solid w-full' ref={inputRef} type="name" value={newName} onChange={e => setNewName(e.target.value)} />
              <button onClick={e => changeNameHandler(newName)} className='bg-green-400 px-1 text-white rounded mr-3'> подтвердить </button>
            </span>
            :
            <span className=' inline-block mr-2'>{user.name}</span>}
          <button
            onClick={e => {
              setChangeNameInput(prev => !prev);
            }}
            className={`${changeNameInput ? 'bg-red-500 text-white' : 'bg-yellow-400 text-333'} px-1  transition-colors rounded inline-block`}
          >
            {changeNameInput ? "закрыть" : "изменить"}
          </button>
        </p>
        {user.email ?
          <>
            <span className='bg-white text-333 p-1 mb-1 block font-medium text-16 rounded w-max'>Email</span>
            <p className='my-2 bg-white px-4 py-2 rounded-lg'>
              <span className=' block text-14 mr-2 '>{user.email}</span>
            </p>
          </>
          :
          <>
            <span className='bg-white text-333 p-1 mb-1 block font-medium text-16 rounded w-max'>Email</span>
            <p className='my-2 bg-white px-4 py-2 rounded-lg'>
              {changeEmailInput ?
                <span>
                  <input className='focus:outline-none rounded-lg py-1 px-2 my-1 border-2 border-333 border-solid w-full' type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} />
                  <button onClick={e => changeEmailHandler(newEmail)} className='bg-green-400 px-1 text-white rounded mr-3'> подтвердить </button>
                </span>
                : <></>}
              <button onClick={e => setChangeEmailInput(prev => !prev)} className={`${changeEmailInput ? 'bg-red-500 text-white' : 'bg-yellow-400 text-333'} px-1 transition-colors rounded`}> {changeEmailInput ? "закрыть" : "указать"} </button>
            </p>
          </>}
        <span className='bg-white text-333 p-1 mb-1 block font-medium text-16 rounded w-max'>Номер телефона</span>
        <p className='my-2 bg-white px-4 py-2 rounded-lg'> <span className='block'>{user.tel}</span></p>
      </div>
      <>
        <ProfileMyWindows setWindows={setMyWindows} myWindows={myWindows} />
      </>
      <button className='flex flex-col items-center bg-red-500 py-2 px-4 w-2/6 h-10 text-white text-center mt-4 rounded-lg ml-auto  ' onClick={logoutHandler} >
        {isLoadingLogout ? <PreloaderMini className='w-6 h-6' /> : "Выйти"}
      </button>
    </div>
  )
}
