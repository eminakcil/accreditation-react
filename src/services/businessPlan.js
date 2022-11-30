import { get, postJSON } from './request'

const SERVICE_PATH = 'business-plans'

export const create = (data) => postJSON(SERVICE_PATH, data)
export const getAll = (filter) => {
  let path = SERVICE_PATH

  if (filter && Object.keys(filter).length > 0) {
    const searchQuery = Object.entries(filter)
      .map(([key, value]) => key.concat('=', value))
      .join('&')

    path += '?' + searchQuery
  }

  return get(path)
}
export const getById = (id) => get(SERVICE_PATH.concat('/', id))
