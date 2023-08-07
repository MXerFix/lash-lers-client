import React, { useEffect, useState } from 'react'
import styles from './PriceList.css'
import { FootMenu } from '../../components/FootMenu/FootMenu'
import { PriceListComponent, priceListI, priceListItemI } from '../../components/PriceListComponent/PriceListComponent'
import { CLASSIC_LASHES, D15_LASHES, D25_LASHES, D2_LASHES, lashPrice, MODAL_TIMEOUT, REMOVE_LASHES, REMOVE_MY_LASHES, REMOVE_MY_LASHES_WITH_NEXT, WET_EFFECT } from '../../utils/consts'
import { get_all_categories, get_all_lashes } from '../../api/lashes'
import { errorTimeoutSet } from '../../helpers/errortimeouthelper'
import { AlertModal } from '../../components/AlertModal/AlertModal'

export const PriceList = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<any[]>([])
  const [lashes, setLashes] = useState<any[]>([])
  const [error, setError] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')

  const errorHandler = (code: number) => {
    switch (code) {
      case 1: return {
        message: '',
        alertType: ''
      }
    }
    return {
      message: '',
      alertType: ''
    }
  }

  const priceList: any[] = []

  useEffect(() => {
    const getPriceList = async () => {
      setIsLoading(prev => true)
      try {
        await get_all_categories().then(({ data }) => {
          setCategories(data.categories)
        })
        await get_all_lashes().then(({ data }) => {
          setLashes(data.lashes)
        })
      } catch (error: any) {
        if (error.response.data) {
          setErrorMessage(prev => error.response.data.split('pre>')[1].split('<br>')[0])
          errorTimeoutSet(setError, 2, MODAL_TIMEOUT)
        } else {
          setErrorMessage(prev => 'Ошибка подгрузки данных, возможно упала база, напиши Мексу')
          errorTimeoutSet(setError, 2, MODAL_TIMEOUT)
        }
      } finally {
        setIsLoading(prev => false)
      }
    }

    getPriceList()

  }, [])

  if (!isLoading) {
    categories.map((category) => {
      priceList.push({
        title: category.value,
        lashes: lashes.filter((lash) => lash.categoryId == category.id)
      })
    })
  }

  return (
    <div className='relative'>
      {error != 0 && <AlertModal alertType={errorHandler(error).alertType}> {errorHandler(error).message} </AlertModal>}
      <PriceListComponent priceList={priceList} />
    </div>
  )
}
