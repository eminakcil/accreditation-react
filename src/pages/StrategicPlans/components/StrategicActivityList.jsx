import { getPath } from '@/utils'
import classNames from 'classnames'
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

  return strategicActivities.map((strategicActivity) => (
    <div
      key={strategicActivity._id}
      onClick={() => toggleSelectedStrategicActivity(strategicActivity._id)}
      className={classNames(
        'h-min shadow hover:shadow-xl rounded-2xl px-2 py-6 select-none cursor-pointer',
        {
          'bg-gray-200':
            selectedStrategicActivity && selectedStrategicActivity._id === strategicActivity._id,
        }
      )}
    >
      {strategicActivity.title}
    </div>
  ))
}
export default StrategicActivityList
