import { get, postJSON } from './request'

const SERVICE_PATH = 'user'

export const getAll = () => get(SERVICE_PATH)
