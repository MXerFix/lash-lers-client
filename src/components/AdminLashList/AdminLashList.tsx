import React from 'react'
import { AdminLashItem } from '../AdminLashItem/AdminLashItem'

export const AdminLashList = ({ lashesList, setLashes }: { lashesList: any[], setLashes: Function }) => {
  return (
    <div className='flex flex-col bg-333 items-start rounded-lg w-full p-4'>
      {lashesList.map((category) => {
        return (
          <div key={category.title} className='bg-white w-full rounded-lg px-4 py-2 mb-2'>
            <h5 className='text-center text-18 my-3'> {category.title} </h5>
            {category.lashes.sort((prevLash: any, currLash: any) => prevLash.price - currLash.price).map((lash: any) => {
              return (
                <AdminLashItem setLashes={setLashes} lash={lash} key={lash.value} />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
