import { useCallback } from 'react'
import { Fragment, useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../components/Button'
import Loading from '../../components/Loading'
import { StrategicPlanService } from '../../services'

const StrategicPlanDetail = () => {
  const { strategicPlanId } = useParams()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [strategicPlan, setStrategicPlan] = useState(false)

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
          <table className="w-full">
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
          </table>

          {/* <pre>{JSON.stringify(strategicPlan, null, 2)}</pre> */}
        </>
      )}
    </>
  )
}
export default StrategicPlanDetail
