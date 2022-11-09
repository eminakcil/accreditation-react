import { getPath } from '@/utils'
import classNames from 'classnames'
import { useState } from 'react'
import { Fragment, useCallback } from 'react'
import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AddButton from './AddButton'
import CreateActivityModal from './CreateActivityModal'

const StrategicActivityList = ({
  strategicActivities,
  editMode = false,
  periodList,
  onActivityCreate = () => {},
}) => {
  /** @type {{strategicPlanId: string, strategicGoalId: string, strategicActivityId: ?string}} */
  const params = useParams()

  const navigate = useNavigate()

  const [activityAddMode, setActivityAddMode] = useState(false)

  const selectedStrategicActivity = useMemo(() => {
    return (
      strategicActivities?.find(
        (strategicActivity) => strategicActivity._id === params.strategicActivityId
      ) || false
    )
  }, [strategicActivities, params])

  const toggleSelectedStrategicActivity = (strategicActivityId) => {
    let path

    if (strategicActivityId === params.strategicActivityId) {
      path = getPath('strategicPlans.detail.goals', {
        strategicPlanId: params.strategicPlanId,
        strategicGoalId: params.strategicGoalId,
      })
    } else {
      path = getPath('strategicPlans.detail.goals.activities', {
        strategicActivityId,
        strategicPlanId: params.strategicPlanId,
        strategicGoalId: params.strategicGoalId,
      })
    }

    navigate(path)
  }

  const strategicActivityIsActive = useCallback(
    (strategicActivityId) => {
      return selectedStrategicActivity && selectedStrategicActivity._id === strategicActivityId
    },
    [selectedStrategicActivity]
  )

  return (
    <>
      {strategicActivities.map((strategicActivity) => (
        <div
          key={strategicActivity._id}
          onClick={() => toggleSelectedStrategicActivity(strategicActivity._id)}
          className={classNames(
            'h-min shadow hover:shadow-xl rounded-2xl px-2 py-6 select-none cursor-pointer',
            {
              'outline outline-blue-600': strategicActivityIsActive(strategicActivity._id),
            }
          )}
        >
          {strategicActivity.title}
          <div className="overflow-hidden">
            <div
              className={classNames('relative transition-all duration-300', {
                'h-0': !strategicActivityIsActive(strategicActivity._id),
                'h-[90px]': strategicActivityIsActive(strategicActivity._id),
              })}
            >
              <div className="absolute bottom-0 w-full flex justify-center">
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
                      <span>{periodGoal.strategicPeriod.title}</span>
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
          </div>
        </div>
      ))}
      {editMode && !activityAddMode && (
        <div className="m-auto">
          <AddButton onClick={() => setActivityAddMode(true)} />
        </div>
      )}
      <CreateActivityModal
        periodList={periodList}
        show={activityAddMode}
        onClose={() => {
          setActivityAddMode(false)
        }}
        onSubmit={onActivityCreate}
      />
    </>
  )
}
export default StrategicActivityList
