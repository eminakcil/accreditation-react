import { get } from './request'

const SERVICE_PATH = 'accreditation'

export const getAll = () => get(SERVICE_PATH)
export const getById = (id) => get(SERVICE_PATH.concat('/', id))
