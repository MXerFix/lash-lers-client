import { AxiosError } from 'axios';
import { $authHost } from '.';
import { ERROR_404 } from '../utils/consts';

export const get_all_lashes = async () => {
  try {
    const response = await $authHost.get('http://localhost:1500/api/lashes/')
    return response
  } catch (error) {
    throw error
  }
}

export const create_lash = async (value: string, bend: string, length: string, price: number, category: string) => {
  const response = await $authHost.post('http://localhost:1500/api/lashes/', { value: value, bend: bend, length: length, price: price, category: category })
  return response
}

export const setting_lash = async (value: string, price: number, id: number) => {
  try {
    const response = await $authHost.put('http://localhost:1500/api/lashes/', { value: value, price: price, id: id })
    return response
  } catch (error) {
    throw error
  }
}

export const delete_lash = async (id: number) => {
  try {
    const response = await $authHost.post('http://localhost:1500/api/lashes/delete', { id: id })
    return response
  } catch (error) {
    throw error
  }
}

export const get_all_categories = async () => {
  try {
    const response = await $authHost.get('http://localhost:1500/api/lashes/category')
    return response
  } catch (error) {
    throw error
  }
}

export const add_category = async (value: string) => {
  try {
    const response = await $authHost.post('http://localhost:1500/api/lashes/category', { value: value })
    return response
  } catch (error) {
    throw error
  }
}