import { get } from './request'

const SERVICE_PATH = 'strategic-periods'

export const getAll = () => get(SERVICE_PATH)
