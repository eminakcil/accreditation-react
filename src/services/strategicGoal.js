import { postJSON } from './request'

const SERVICE_PATH = 'strategic-goals'

export const create = (data) => postJSON(SERVICE_PATH, data)
