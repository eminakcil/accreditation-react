import { post } from './request'

const SERVICE_PATH = 'business-plan-proof'

export const create = (data) => post(SERVICE_PATH, data)
