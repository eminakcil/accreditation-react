import { get, post } from './request'

export const list = () => get('logos')
export const newLogo = (data) => post('logos', data)
