import { getPath } from '@/utils'
import Button from '@components/Button'
import Divider from '@components/Divider'
import classNames from 'classnames'
import { useState } from 'react'
import { Fragment, useCallback } from 'react'
import { useMemo } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AddButton from './AddButton'
import CreateActivityModal from './CreateActivityModal'
import Hideable from './Hideable'

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
          <Hideable
            duration={300}
            show={strategicActivityIsActive(strategicActivity._id)}
          >
            <div className="pt-5 space-y-3">
              <div className="float-right">
                <Button
                  as={Link}
                  to={{
                    pathname: getPath('businessPlan.create'),
                    search: `?strategicActivity=${strategicActivity._id}`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    console.log('damla')
                  }}
                  className="float-right inline-flex items-center gap-2"
                >
                  <span>İş Planı</span> <FaPencilAlt />
                </Button>
              </div>
              <div className="flex flex-col items-center">
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
          </Hideable>
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
