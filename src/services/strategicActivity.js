import { postJSON } from './request'

const SERVICE_PATH = 'strategic-activity'

export const create = (data) => postJSON(SERVICE_PATH, data)
