import { useMemo, useState } from 'react'

const AccreditationSelect = ({ accreditationList }) => {
  const [parentId, setParentId] = useState(null)
  const list = useMemo(() => {
    return accreditationList.filter((x) => x.parent === parentId)
  }, [parentId, accreditationList])

  return (
    <div className="space-y-3">
      {list.map((item) => (
        <div
          key={item._id}
          className="p-3 bg-slate-200"
          onClick={() => setParentId(item._id)}
        >
          {item.title}
        </div>
      ))}
    </div>
  )
}
export default AccreditationSelect
