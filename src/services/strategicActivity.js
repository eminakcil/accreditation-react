import { get, postJSON } from './request'

const SERVICE_PATH = 'strategic-activity'

export const getById = (id) => get([SERVICE_PATH, id].join('/'))
export const create = (data) => postJSON(SERVICE_PATH, data)
export const getAll = () => get(SERVICE_PATH)
