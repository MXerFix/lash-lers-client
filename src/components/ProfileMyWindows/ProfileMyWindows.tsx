import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { handleSettings } from '../../helpers/stateHandler'
import { ENTRY_ROUTE } from '../../utils/consts'
import { ProfileMyWindowItem } from '../ProfileMyWindowItem/ProfileMyWindowItem'

export const ProfileMyWindows = ({ myWindows, setWindows }: { myWindows: any[], setWindows: Function }) => {

  const [pastWindows, setPastWindows] = useState(false)
  const isWindows = myWindows.length > 0

  return (
    <div className='bg-333 text-white py-4 px-6 rounded-lg w-full'>
      <h4 className='text-center mb-2 text-18'> Мои записи </h4>
      {isWindows &&
        <button
          onClick={e => { handleSettings(e, setPastWindows, !pastWindows) }}
          className={`py-2 px-6 mb-1 ${pastWindows ? 'bg-red-500 text-white' : 'bg-green-400'} w-full rounded-lg`}>
          {pastWindows ? "Скрывать прошедшие" : "Показывать прошедшие"}
        </button>}
      {myWindows.length ? myWindows.sort((a, b) => Date.parse(a.time) - Date.parse(b.time)).filter((window) => {
        if (!pastWindows) return Date.parse(window.time) > Date.now()
        else return true
      }).map((window: { id: number, time: string, isPicked: boolean }) => {
        return (
          <ProfileMyWindowItem setWindows={setWindows} window={window} key={window.id} />
        )

      }) :
        <div className='flex flex-col items-center'>
          <span className='bg-white text-333 py-2 px-3 text-center block rounded-lg'> У Вас нет активных или прошлых записей </span>
          <NavLink className={`bg-green-400 text-white py-1.5 px-2.5 text-center rounded-lg relative bottom-2`} to={`../${ENTRY_ROUTE}`} > Записаться </NavLink>
        </div>}
    </div>
  )
}
