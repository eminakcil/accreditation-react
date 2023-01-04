import { get, postJSON } from './request'

const SERVICE_PATH = 'accreditation'

export const getAll = () => get(SERVICE_PATH)
export const getAllNested = () => get(SERVICE_PATH + '/nested')
export const getById = (id) => get(SERVICE_PATH.concat('/', id))
export const addBusinessPlan = (data) => postJSON(SERVICE_PATH + '/add-business-plan', data)
