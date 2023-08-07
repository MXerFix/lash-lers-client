import axios, { AxiosError } from "axios"
import jwtDecode from "jwt-decode"
import { $authHost, $host } from "."
import { HOST_URL } from "../utils/consts"


export const auth = async (name: string, password: string, email: string, tel: string) => {
  try {
    const response = await $host.post(`http://localhost:1500/api/user/auth`, { name: name, email: email, password: password, tel: tel })
    localStorage.setItem('token', response.data.token)
    return jwtDecode(response.data.token)
  } catch (error) {
    throw error
  }
}

export const check = async () => {
  try {
    const response = await $authHost.get('http://localhost:1500/api/user/auth')
    localStorage.setItem('token', response.data.token)
    return jwtDecode(response.data.token)
  } catch (error) {
    throw error
  }
}