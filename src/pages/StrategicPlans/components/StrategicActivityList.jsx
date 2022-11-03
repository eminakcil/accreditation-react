import { getPath } from '@/utils'
import classNames from 'classnames'
import { Fragment, useCallback } from 'react'
import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const StrategicActivityList = ({ strategicActivities }) => {
  /** @type {{strategicPlanId: string, strategicGoalId: string, strategicActivityId: ?string}} */
  const params = useParams()

  const navigate = useNavigate()

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

  return strategicActivities.map((strategicActivity) => (
    <div
      key={strategicActivity._id}
      onClick={() => toggleSelectedStrategicActivity(strategicActivity._id)}
      className={classNames(
        'h-min shadow hover:shadow-xl rounded-2xl px-2 py-6 select-none cursor-pointer',
        {
          'bg-gray-200': strategicActivityIsActive(strategicActivity._id),
        }
      )}
    >
      {strategicActivity.title}
      {strategicActivityIsActive(strategicActivity._id) && (
        <div>
          <div className="inline-flex divide-x divide-solid divide-gray-800">
            {strategicActivity.periodGoal.map((periodGoal) => (
              <Fragment key={periodGoal._id}>
                <div className="inline-flex flex-col items-center px-3">
                  <span>{periodGoal.strategicPeriod.title}</span>
                  <span>{periodGoal.goal}</span>
                  <span>{periodGoal.price}</span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  ))
}
export default StrategicActivityList
