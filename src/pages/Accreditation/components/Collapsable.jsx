import { openLinkOnNewTab } from '@/utils'
import Divider from '@components/Divider'
import FileCard from '@components/FileCard'
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

        {item.businessPlanList.length > 0 && (
          <>
            <Divider thin />
            {item.businessPlanList.map((businessPlan) => (
              <div
                key={businessPlan._id}
                className="block p-6 bg-white border border-solid border-gray-200 rounded-lg shadow-md hover:bg-gray-100 max-w-full overflow-hidden"
              >
                <span>{businessPlan.title}</span>
                <p className="text-ellipsis overflow-hidden font-thin text-sm">
                  {businessPlan.proof.description}
                </p>
                <div className="space-y-2 mt-2">
                  {businessPlan.proof.path.map((path, index) => (
                    <FileCard
                      key={index}
                      onClick={() => openLinkOnNewTab(path)}
                      isRemovable={false}
                    >
                      {path}
                    </FileCard>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
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
