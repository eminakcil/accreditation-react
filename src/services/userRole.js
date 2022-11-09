import { get, postJSON } from './request'

const SERVICE_PATH = 'user-role'

export const getAll = () => get(SERVICE_PATH)
