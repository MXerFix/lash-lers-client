import React, { useState } from 'react'
import { handleSettings } from '../../helpers/stateHandler'
import { AdminAddCategory } from '../AdminAddCategory/AdminAddCategory'
import { AdminAddLashes } from '../AdminAddLashes/AdminAddLashes'
import { AdminBtn } from '../AdminBtn/AdminBtn'
import { AdminLashList } from '../AdminLashList/AdminLashList'

type AdminLashInstrumentsType = {
  lashesList: any[]
  categories: any[]
  setLashes: Function
  setCategories: Function
}

export const AdminLashInstruments = ({ lashesList, setLashes, categories, setCategories }: AdminLashInstrumentsType) => {

  const [isAddLashes, setIsAddLashes] = useState(false)
  const [isOpenAllLashes, setIsOpenAllLashes] = useState(false)
  const [isCategoryAdd, setIsCategoryAdd] = useState(false)

  return (
    <div className='flex flex-col items-center w-full'>
      <div className='flex flex-row w-full'>
        <AdminBtn
          isBlockActive={isOpenAllLashes}
          onClickHandler={(e) => handleSettings(e, setIsOpenAllLashes, !isOpenAllLashes)}>
          Все реснички
        </AdminBtn>
        <AdminBtn
          isBlockActive={isAddLashes}
          onClickHandler={(e) => handleSettings(e, setIsAddLashes, !isAddLashes)}>
          Добавить тип ресничек
        </AdminBtn>
      </div>
      {isOpenAllLashes && <AdminLashList lashesList={lashesList} setLashes={setLashes} />}
      {isAddLashes && <AdminAddLashes setLashes={setLashes} categories={categories} />}
      <AdminBtn
        onClickHandler={(e) => handleSettings(e, setIsCategoryAdd, !isCategoryAdd)}
        isBlockActive={isCategoryAdd}>
        Добавить категорию прайс-листа
      </AdminBtn>
      {isCategoryAdd && <AdminAddCategory setCategories={setCategories} />}
    </div>
  )
}
