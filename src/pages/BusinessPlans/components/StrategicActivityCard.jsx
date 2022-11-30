import Divider from '@components/Divider'
import classNames from 'classnames'
import { useEffect } from 'react'
import { Fragment, useMemo, useState } from 'react'

const StrategicActivityCard = ({ strategicActivity, onYearChange }) => {
  const [selectedYearId, setSelectedYearId] = useState(false)

  const selectedYear = useMemo(
    () =>
      strategicActivity.periodGoal
        .map((x) => x.strategicPeriod)
        .find((period) => period._id === selectedYearId),
    [strategicActivity, selectedYearId]
  )

  useEffect(() => onYearChange?.(selectedYear), [selectedYear])

  return (
    <div className="pt-5 space-y-3">
      <div className="flex flex-col items-center">
        <span>{strategicActivity.title}</span>
        <span className="font-medium">Performans Göstergesi</span>
        <span>{strategicActivity.performanceIndicator}</span>
      </div>
      <Divider />
      <div className="flex justify-center">
        <div className="inline-flex flex-col items-end px-3">
          <span>Yıl</span>
          <span>Hedef</span>
          <span>Maliyet</span>
        </div>
        {strategicActivity.periodGoal.map((periodGoal, index) => (
          <Fragment key={periodGoal._id}>
            {index > 0 && (
              <div className="border-r h-[48px] self-center border-solid border-gray-500"></div>
            )}
            <div className="inline-flex flex-col items-center px-3">
              <button
                type="button"
                className={classNames('px-2 rounded-md cursor-pointer select-none', {
                  'bg-gray-300 hover:bg-gray-500 text-gray-800 hover:text-gray-100':
                    selectedYearId !== periodGoal.strategicPeriod._id,
                  'bg-red-500 hover:bg-red-700 text-gray-100':
                    selectedYearId === periodGoal.strategicPeriod._id,
                })}
                onClick={() => setSelectedYearId(periodGoal.strategicPeriod._id)}
              >
                {periodGoal.strategicPeriod.year}
              </button>
              <span>{periodGoal.goal}</span>
              <span>{periodGoal.price}</span>
            </div>
          </Fragment>
        ))}
        <div className="inline-flex flex-col items-start px-3">
          <span>Yıl</span>
          <span>Hedef</span>
          <span>Maliyet</span>
        </div>
      </div>
    </div>
  )
}

export default StrategicActivityCard
