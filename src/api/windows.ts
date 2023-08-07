import { AxiosError } from 'axios';
import { $authHost } from './index';


export const add_window = async (time: string) => {
  try {
    const response = await $authHost.post('http://localhost:1500/api/windows/add', { time: time })
    return response
  } catch (error) {
    throw error
  }
}

export const delete_window = async (id: number) => {
  try {
    const response = await $authHost.post('http://localhost:1500/api/windows/delete', {id: id})
    return response
  } catch (error) {
    throw error
  }
}

export const get_all_windows = async () => {
  try {
    const response = await $authHost.get('http://localhost:1500/api/windows/all')
    return response
  } catch (error) {
    throw error
  }
}

export const get_available_windows = async () => {
  try {
    const response = await $authHost.get('http://localhost:1500/api/windows/get')
    return response
  } catch (error) {
    throw error
  }
}

export const pick_window = async (time: string, id: number, pick: boolean) => {
  try {
    const response = await $authHost.post('http://localhost:1500/api/windows/pick', { time, id, pick })
    return response
  } catch (error) {
    throw error
  }
}

export const get_my_windows = async (id: number) => {
  try {
    const response = await $authHost.post('http://localhost:1500/api/windows/my', { id })
    return response
  } catch (error) {
    throw error
  }
}