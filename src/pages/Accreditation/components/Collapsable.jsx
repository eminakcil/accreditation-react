import classNames from 'classnames'
import { useState } from 'react'

const Collapsable = ({ item, indent = 0 }) => {
  const [active, setActive] = useState(false)

  const colors = ['#C8D7E6', '#E4EAF1', '#F5F9FC', '#FAFCFF']

  const colorIndex = indent % colors.length

  const toggleActivity = () => {
    setActive((x) => !x)
  }

  return (
    <>
      <div
        onClick={toggleActivity}
        style={{ backgroundColor: colors[colorIndex] }}
        className="text-gray-900 p-3 rounded-lg space-y-3 grid py-4"
      >
        <span className="flex-1">{item.title}</span>
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
              indent={indent + 1}
              item={item}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default Collapsable
