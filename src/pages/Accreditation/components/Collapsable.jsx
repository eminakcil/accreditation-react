import classNames from 'classnames'
import { useState } from 'react'

const Collapsable = ({ item }) => {
  const [active, setActive] = useState(false)

  const colors = ['#B0C0D0', '#D4E0ED', '#EDF3FA', '#F5FAFF']

  const indent = item.indent % colors.length

  const toggleActivity = () => {
    setActive((x) => !x)
  }

  return (
    <>
      <div
        onClick={toggleActivity}
        style={{ backgroundColor: colors[indent] }}
        className="text-gray-900 p-3 rounded-lg space-y-3 grid grid-cols-2 py-4"
      >
        <span className="flex-1">
          {item.no} {item.name}
        </span>
        <span></span>
        <span className="flex text-cyan-700 justify-start">{item.extras}</span>
      </div>

      {'children' in item && (
        <div
          className={classNames('space-y-3', {
            hidden: !active,
          })}
        >
          {item?.children?.map((item, index) => (
            <Collapsable
              key={index}
              item={item}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default Collapsable
