import { get, postJSON } from './request'

const SERVICE_PATH = 'business-plans'

export const create = (data) => postJSON(SERVICE_PATH, data)
export const getAll = () => get(SERVICE_PATH)
