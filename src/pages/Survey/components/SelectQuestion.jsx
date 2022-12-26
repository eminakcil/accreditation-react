import { Checkbox, Label, TextInput } from 'flowbite-react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useReducer } from 'react'
import inputListReducer, { initialInputList } from '../../../reducers/inputListReducer'

const SelectQuestion = ({
  prefix = '',
  initalValue = false,
  allowNewItem = true,
  label = 'Seçim listeli soru tipi',
  editableItems = true,
  allowMultiselectToggle = true,
  multiSelect = false,
  title = '',
  onChange = () => {},
}) => {
  const [_multiSelect, set_multiSelect] = useState(multiSelect)

  const [selectItems, selectItemsDispatch] = useReducer(
    inputListReducer,
    initialInputList(allowNewItem, initalValue)
  )

  const [titleValue, setTitleValue] = useState(title)

  useEffect(() => {
    onChange({
      type: 'select',
      title: titleValue,
      multiSelect: _multiSelect,
      allowMultiselectToggle,
      selectItems,
      allowNewItem,
      label,
      editableItems,
    })
  }, [_multiSelect, selectItems, titleValue])

  return (
    <div>
      <div className="mb-2 block">
        <Label value={`${prefix}${label}`} />
      </div>
      <div className="mb-2">
        <TextInput
          type="text"
          placeholder="Soru başlığı"
          value={titleValue}
          onChange={(e) => {
            setTitleValue(e.target.value)
          }}
        />
      </div>
      {allowMultiselectToggle && (
        <div className="flex items-center gap-2 mb-2">
          <Checkbox
            checked={_multiSelect}
            onChange={(e) => set_multiSelect(e.target.checked)}
          />
          <Label>Birden çok seçime izin ver</Label>
        </div>
      )}
      <div className="ml-8 grid grid-cols-1 gap-2">
        {selectItems.map((selectItem) => (
          <div
            className="flex items-center gap-2"
            key={selectItem.id}
          >
            <div className="h-4 w-4 rounded-full bg-blue-600"></div>
            <TextInput
              type="text"
              placeholder="Seçenek"
              className="mb-2"
              value={selectItem.value}
              onChange={(e) =>
                selectItemsDispatch({ type: 'CHANGE', id: selectItem.id, value: e.target.value })
              }
              onBlur={(e) =>
                selectItemsDispatch({ type: 'BLUR', id: selectItem.id, value: e.target.value })
              }
              readOnly={!editableItems}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SelectQuestion
