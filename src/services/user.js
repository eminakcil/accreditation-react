import { get, postJSON } from './request'

const SERVICE_PATH = 'user'

export const getAll = () => get(SERVICE_PATH)
export const create = (data) => postJSON(SERVICE_PATH, data)
