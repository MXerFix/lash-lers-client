import React, { useState } from 'react'
import { delete_window } from '../../api/windows'
import { errorTimeoutSet } from '../../helpers/errortimeouthelper'
import { handleSettings } from '../../helpers/stateHandler'
import { ERROR_ALERT, GREEN_ALERT, MODAL_TIMEOUT, WARNING_ALERT } from '../../utils/consts'
import { AdminAllWindowsItem } from '../AdminAllWindowsItem/AdminAllWindowsItem'
import { AlertModal } from '../AlertModal/AlertModal'
import PreloaderMini from '../PreloaderMini/PreloaderMini'

export const AdminAllWindowsList = ({ users, windows, setWindows }: { users: any[], windows: any[], setWindows: Function }) => {

  const [pastWindows, setPastWindows] = useState(false)


  


  return (
    <>
      <div className='w-full flex flex-col items-center'>
        <button
          onClick={e => { handleSettings(e, setPastWindows, !pastWindows) }}
          className={`py-2 px-6 mb-1 mt-1 ${pastWindows ? 'bg-red-500 text-white' : 'bg-green-400'} w-full rounded-lg mx-0.5`}>
          {pastWindows ? "Скрывать прошедшие" : "Показывать прошедшие"}
        </button>
        {windows ? windows.sort((a, b) => Date.parse(a.time) - Date.parse(b.time)).filter((date) => {
          if (pastWindows) {
            return true
          } else {
            return Date.parse(date.time) > Date.now()
          }
        }).map((window: { id: number, time: string, isPicked: boolean, userId: number }) => {
          const isPast = Date.parse(window.time) < Date.now()
          const user = window.isPicked ? users.find((findUser) => findUser.id == window.userId) : {}
          user ? user : window.isPicked = false
          // const TIME = window.time.split('T')
          // const date = TIME[0].split('-')
          // const actual_date = `${date[0]}.${date[1]}.${date[2]}`
          // const actual_time = TIME[1].slice(0, 5)
          // const time = new Date(actual_date + ' ' + actual_time + ' ' + 'UTC')
          const safari_time = new Date(window.time).toLocaleString().slice(0, 17)
          return (
            <AdminAllWindowsItem setWindows={setWindows} time={safari_time} user={user} window={window} key={window.id} />
          )
        }) : <></>}
      </div>
    </>
  )
}
