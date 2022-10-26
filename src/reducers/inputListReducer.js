import { nanoid } from 'nanoid'

let allowNewItem

export const initialInputList = (_allowNewItem = true, initalValue = false) => {
  allowNewItem = _allowNewItem
  if (initalValue) {
    return initalValue
  }

  return [
    {
      value: '',
      id: nanoid(),
    },
  ]
}

export default (state, action) => {
  switch (action.type) {
    case 'CHANGE': {
      const newList = [...state]
      const existingColumnIndex = newList.findIndex((x) => x.id === action.id)
      newList[existingColumnIndex].value = action.value

      if (existingColumnIndex === newList.length - 1 && allowNewItem) {
        newList.push({
          value: '',
          id: nanoid(),
        })
      }
      return newList
    }
    case 'BLUR': {
      const newList = [...state]

      const itemIndex = newList.findIndex((x) => x.id === action.id)
      if (newList.length !== itemIndex + 1 && action.value.length === 0) {
        newList.splice(itemIndex, 1)
      }
      return newList
    }
    default:
      return state
  }
}
