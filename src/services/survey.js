import { get, postJSON } from './request'

const SERVICE_PATH = 'survey'

export const getAll = () => get(SERVICE_PATH)
export const getById = (id) => get(SERVICE_PATH.concat('/', id))
export const newSurvey = (data) => postJSON('surveys', data)
