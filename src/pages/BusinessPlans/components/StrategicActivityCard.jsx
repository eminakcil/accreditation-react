import Divider from '@components/Divider'
import { Fragment } from 'react'

const StrategicActivityCard = ({ strategicActivity }) => {
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
              <span>{periodGoal.strategicPeriod.year}</span>
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
