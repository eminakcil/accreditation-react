import { get } from './request'

const SERVICE_PATH = 'strategic-plans'

export const getAll = () => get(SERVICE_PATH)
export const getById = (id) => get(SERVICE_PATH.concat('/', id))
