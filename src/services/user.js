import { get, postJSON } from './request'

const SERVICE_PATH = 'user'

export const getAll = () => get(SERVICE_PATH)
export const create = (data) => postJSON(SERVICE_PATH, data)
export const login = (data) => postJSON(SERVICE_PATH + '/login', data)
export const refreshToken = (data) => postJSON(SERVICE_PATH + '/refresh-token', data)
