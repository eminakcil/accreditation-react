import { getPeriodTitleByStrategicPlan } from '@/utils'
import Divider from '@components/Divider'
import { Card } from 'flowbite-react'
import { useCallback } from 'react'
import { Fragment, useEffect, useMemo } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../components/Button'
import Loading from '../../components/Loading'
import { StrategicPlanService } from '../../services'
import Heading from './components/Heading'

const StrategicPlanDetail = () => {
  const { strategicPlanId } = useParams()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [strategicPlan, setStrategicPlan] = useState(false)

  const [selectedStrategicGoalId, setSelectedStrategicGoalId] = useState(false)

  const selectedStrategicGoal = useMemo(() => {
    return strategicPlan.strategicGoals?.find(
      (strategicGoal) => strategicGoal._id === selectedStrategicGoalId
    )
  }, [strategicPlan, selectedStrategicGoalId])

  const getPeriodGoal = useCallback(
    (strategicActivity, periodId) => {
      return strategicActivity.periodGoal.find(
        (periodGoal) => periodGoal.strategicPeriod._id === periodId
      )
    },
    [strategicPlan]
  )

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    setLoading(true)
    setError(false)

    StrategicPlanService.getById(strategicPlanId)
      .then((response) => setStrategicPlan(response))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }

  if (loading) return <Loading />

  if (error)
    return (
      <>
        Hata <Button onClick={fetchData}>Tekrar Dene</Button>
      </>
    )

  return (
    <>
      {strategicPlan && (
        <>
          <Card>
            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-col items-center">
                <span className="text-xl">{strategicPlan.title}</span>
                <span className="text-xl">{getPeriodTitleByStrategicPlan(strategicPlan)}</span>
              </div>
              <Divider />
              <div className="flex gap-4">
                <div className="w-[256px] flex-shrink-0 grid grid-cols-1 gap-4">
                  <Heading>Hedef</Heading>
                  {strategicPlan.strategicGoals.map((strategicGoal) => (
                    <div
                      className="h-min shadow hover:shadow-xl rounded-2xl px-2 py-6 select-none cursor-pointer"
                      key={strategicGoal._id}
                      onClick={() => setSelectedStrategicGoalId(strategicGoal._id)}
                    >
                      {strategicGoal.title}
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-1 gap-4">
                    <Heading>Faaliyetler</Heading>
                    {selectedStrategicGoal &&
                      selectedStrategicGoal.strategicActivities.map((strategicActivity) => (
                        <div
                          className="shadow hover:shadow-xl rounded-2xl px-2 py-6 select-none cursor-pointer"
                          key={strategicActivity._id}
                        >
                          {strategicActivity.title}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
          {/* <table className="w-full">
            <thead>
              <tr>
                <td>{strategicPlan.title}</td>
              </tr>
              {strategicPlan.strategicGoals.map((strategicGoal) => (
                <Fragment key={strategicGoal._id}>
                  <tr>
                    <td>Stratejik Hedef</td>
                    <td>{strategicGoal.title}</td>
                    <td>Performans Göstergesi</td>
                    <td>Performans Hedefi</td>
                    {strategicPlan.period.map((period) => (
                      <td key={period._id}>{period.title}</td>
                    ))}
                    <td>Sorumlu</td>
                  </tr>
                  {strategicGoal.strategicActivities.map((strategicActivity) => (
                    <tr key={strategicActivity._id}>
                      <td></td>
                      <td>{strategicActivity.title}</td>
                      <td>{strategicActivity.performanceIndicator}</td>
                      <td>{strategicActivity.performanceGoalCount}</td>
                      {strategicPlan.period.map((period) => (
                        <td key={period._id}>
                          <span className="flex flex-col">
                            <span>{getPeriodGoal(strategicActivity, period._id).goal}</span>
                            <span>{getPeriodGoal(strategicActivity, period._id).price}</span>
                          </span>
                        </td>
                      ))}
                      <td>{strategicActivity.responsible}</td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </thead>
          </table> */}

          {/* <pre>{JSON.stringify(strategicPlan, null, 2)}</pre> */}
        </>
      )}
    </>
  )
}
export default StrategicPlanDetail
