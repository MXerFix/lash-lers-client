import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { get_available_windows, pick_window } from '../../api/windows'
import { AlertModal } from '../../components/AlertModal/AlertModal'
import { FootMenu } from '../../components/FootMenu/FootMenu'
import PreloaderMini from '../../components/PreloaderMini/PreloaderMini'
import { errorTimeoutSet } from '../../helpers/errortimeouthelper'
import { handleSettings } from '../../helpers/stateHandler'
import { RootState } from '../../store/store'
import { ERROR_ALERT, FETCH_TIMEOUT, GREEN_ALERT, MODAL_TIMEOUT, WARNING_ALERT } from '../../utils/consts'

type errorHandlerType = {
  message: string,
  alertType: string
}

export const OnlineEntry = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [windows, setWindows] = useState<any[]>([])
  const [selectedWindow, setSelectedWindow] = useState('')
  const [update, setUpdate] = useState(false)
  const [error, setError] = useState<number>(0)
  const [errorMessage, setErrorMessage] = useState('')
  const id = useSelector((state: RootState) => state.user.user.id)
  const isLogin = useSelector((state: RootState) => state.user.isLogin)
  const navigate = useNavigate()


  const errorHandler = (code: number) => {
    switch (code) {
      case 1: return {
        message: 'Нужно выбрать свободное окошко',
        alertType: WARNING_ALERT
      }
      case 1000: return {
        message: "Пожалуйста, авторизуйтесь",
        alertType: WARNING_ALERT
      }
      case 400: return {
        message: errorMessage,
        alertType: ERROR_ALERT
      }
      case 200: return {
        message: 'Запись подтверждена и отображена в Вашем профиле',
        alertType: GREEN_ALERT
      }
    }
    return {
      message: '',
      alertType: ''
    }
  }

  useEffect(() => {
    const getAvailableWindows = async () => {
      try {
        await get_available_windows()
          .then(({ data }) => {
            setWindows(data.windows)
          })
      } catch (error) {

      }
    }
    getAvailableWindows()
    isLogin ? 0 : errorTimeoutSet(setError, 1000, MODAL_TIMEOUT)
  }, [])

  const pickWindowHandler = async () => {
    setIsLoading(prev => true)
    setTimeout(async () => {
      if (isLogin) {
        if (selectedWindow != '' && selectedWindow != 'default') {
          try {
            const response = await pick_window(selectedWindow, id, true)
            errorTimeoutSet(setError, 200, MODAL_TIMEOUT)
            setIsLoading(prev => false)
            setWindows(prev => response.data.available_windows)
            return response
          } catch (error: any) {
            setErrorMessage(prev => error.response.data.split('pre>')[1].split('<br>')[0])
            errorTimeoutSet(setError, error.response.status, MODAL_TIMEOUT)
            setIsLoading(prev => false)
          } finally {
          }
        } else {
          errorTimeoutSet(setError, 1, MODAL_TIMEOUT)
          setIsLoading(prev => false)
        }
      } else {
        navigate('../auth')
        setIsLoading(prev => false)
      }
    }, FETCH_TIMEOUT);
  }

  return (
    <div className='flex flex-col items-center px-6 relative'>
      {error != 0 && <AlertModal alertType={errorHandler(error)?.alertType}> {errorHandler(error)?.message} </AlertModal>}
      <h2 className='text-center text-26 my-6'>Онлайн запись</h2>
      <label className='text-center text-20 mb-2' htmlFor="">
        Выберите удобное время
      </label>
      <div className='bg-333 p-4 mb-2 w-full rounded-lg'>
        <select className='py-2 px-2 rounded my-2 w-full' value={selectedWindow} onChange={(e) => setSelectedWindow(e.target.value)} name="" id="">
          <option value="default"> Свободные окошки... </option>
          {windows ? windows.sort((a, b) => Date.parse(a.time) - Date.parse(b.time)).filter((date) => Date.parse(date.time) > Date.now()).map((window: { id: number, time: string, isPicked: boolean }) => {
            // const TIME = window.time.split('T')
            // const date = TIME[0].split('-')
            // const actual_date = `${date[0]}.${date[1]}.${date[2]}`
            // const actual_time = TIME[1].slice(0, 5)
            // const time = new Date(actual_date + ' ' + actual_time + ' ' + 'UTC')
            const safari_time = new Date(window.time)
            // .toLocaleString().slice(0, 17)
            const setDayOfTheWeek = (day: number) => {
              switch (day) {
                case 0: return "Воскресенье"
                case 1: return 'Понедельник'
                case 2: return "Вторник"
                case 3: return "Среда"
                case 4: return "Четверг"
                case 5: return "Пятница"
                case 6: return "Суббота"
              }
            }
            return (
              <option value={window.time} key={window.id}>
                {setDayOfTheWeek(safari_time.getDay()) + ', ' + safari_time.toLocaleString().slice(0, 17).split(',')[1] + ', ' + safari_time.toLocaleString().slice(0, 17).split(',')[0]}
              </option>
            )
          }) : <></>}
        </select>
      </div>
      <button
        className='py-2 px-6 text-white bg-green-500 rounded-lg w-full h-10 flex flex-col items-center justify-center'
        onClick={(e) => { pickWindowHandler() }}>
        {isLoading ? <PreloaderMini className='w-6 h-6' /> : "Записаться"}
      </button>
    </div>
  )
}
