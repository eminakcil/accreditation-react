import classNames from 'classnames'
import { useCallback } from 'react'
import { forwardRef, useImperativeHandle, useState } from 'react'

const AccreditationSelect = forwardRef(({ accreditationList }, ref) => {
  const [activeList, setActiveList] = useState(accreditationList)
  const [selectedItems, setSelectedItems] = useState([])

  const toggleItem = (item) => {
    const { _id: id } = item
    const index = selectedItems.indexOf(id)
    if (index === -1) {
      setSelectedItems((x) => x.concat(id))
    } else {
      setSelectedItems((list) => list.filter((x) => x !== id))
    }
  }

  const handleClick = (item) => {
    // console.log(hasInArray(item._id))
    if (item.children.length > 0) {
      setActiveList(item.children)
    } else {
      toggleItem(item)
    }
  }

  const hasInArray = useCallback(
    (id) => selectedItems.indexOf(id) !== -1,
    [selectedItems, accreditationList, activeList]
  )

  const back = () => setActiveList(accreditationList)

  useImperativeHandle(ref, () => ({
    back,
    selectedItems,
  }))

  return (
    <div className="space-y-3">
      {activeList.map((item) => (
        <div
          key={item._id}
          className={classNames('p-3 bg-slate-200 select-none cursor-pointer', {
            'bg-slate-400': hasInArray(item._id),
          })}
          onClick={() => handleClick(item)}
        >
          {item.title}
        </div>
      ))}
    </div>
  )
})

AccreditationSelect.displayName = 'AccreditationSelect'

export default AccreditationSelect
