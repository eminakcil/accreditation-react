import { get, postJSON } from './request'

const SERVICE_PATH = 'manuel-plans'

export const create = (data) => postJSON(SERVICE_PATH, data)
export const getAll = () => get(SERVICE_PATH)
export const getById = (id) => get(SERVICE_PATH.concat('/', id))
