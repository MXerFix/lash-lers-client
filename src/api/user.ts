import { AxiosError } from 'axios';
import { $authHost } from "."


export const get_one_user = async (id: number) => {
  try {
    const response = await $authHost.post('http://localhost:1500/api/user/get', { id })
    return response
  } catch (error) {
    throw error
  }
}

export const get_all_users = async () => {
  try {
    const response = await $authHost.get('http://localhost:1500/api/user/get')
    return response
  } catch (error) {
    throw error
  }
}

export const change_name = async (name: string, id: number) => {
  try {
    const response = await $authHost.put('http://localhost:1500/api/user/settings/name', { name, id })
    return response
  } catch (error) {
    throw error
  }
}

export const change_email = async (email: string, id: number) => {
  try {
    const response = await $authHost.put('http://localhost:1500/api/user/settings/email', { email, id })
    return response
  } catch (error) {
    throw error
  }
}