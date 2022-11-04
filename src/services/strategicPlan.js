import { get, postJSON } from './request'

const SERVICE_PATH = 'strategic-plans'

export const getAll = () => get(SERVICE_PATH)
export const getById = (id) => get(SERVICE_PATH.concat('/', id))
export const create = (data) => postJSON(SERVICE_PATH, data)
