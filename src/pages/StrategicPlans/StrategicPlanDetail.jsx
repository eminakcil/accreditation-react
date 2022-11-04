import { getPath, getPeriodTitleByStrategicPlan } from '@/utils'
import Divider from '@components/Divider'
import classNames from 'classnames'
import { Card, Table } from 'flowbite-react'
import { Fragment, lazy, Suspense, useCallback } from 'react'
import { useEffect, useMemo } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/Button'
import Loading from '../../components/Loading'
import { StrategicPlanService } from '../../services'
import Heading from './components/Heading'
const StrategicActivityList = lazy(() => import('./components/StrategicActivityList'))

const StrategicPlanDetail = () => {
  const params = useParams()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [strategicPlan, setStrategicPlan] = useState(false)

  const selectedStrategicGoal = useMemo(() => {
    return (
      strategicPlan.strategicGoals?.find(
        (strategicGoal) => strategicGoal._id === params.strategicGoalId
      ) || false
    )
  }, [strategicPlan, params])

  const getPeriodGoal = useCallback(
    (strategicActivity, periodId) => {
      return strategicActivity.periodGoal.find(
        (periodGoal) => periodGoal.strategicPeriod._id === periodId
      )
    },
    [strategicPlan]
  )

  const [show, setShow] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    setLoading(true)
    setError(false)

    StrategicPlanService.getById(params.strategicPlanId)
      .then((response) => setStrategicPlan(response))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }

  const toggleSelectedStrategicGoalId = (strategicGoalId) => {
    if (strategicGoalId === params.strategicGoalId) {
      navigate(getPath('strategicPlans.detail', { strategicPlanId: params.strategicPlanId }))
    } else {
      navigate(
        getPath('strategicPlans.detail.goals', {
          strategicGoalId,
          strategicPlanId: params.strategicPlanId,
        })
      )
    }
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
              <div>
                <Button onClick={() => setShow((show) => !show)}>
                  {show ? 'Tabloyu Gizle' : 'Tabloyu Görüntüle'}
                </Button>
              </div>

              <Table striped={true}>
                <Table.Head>
                  <Table.HeadCell>{strategicPlan.title}</Table.HeadCell>
                </Table.Head>
                <Table.Head>
                  {strategicPlan.strategicGoals.map((strategicGoal) => (
                    <Fragment key={strategicGoal._id}>
                      <Table.Head>
                        <Table.HeadCell>Stratejik Hedef</Table.HeadCell>
                        <Table.HeadCell>{strategicGoal.title}</Table.HeadCell>
                        <Table.HeadCell>Performans Göstergesi</Table.HeadCell>
                        <Table.HeadCell>Performans Hedefi</Table.HeadCell>
                        {strategicPlan.period.map((period) => (
                          <Table.HeadCell key={period._id}>{period.title}</Table.HeadCell>
                        ))}
                        <Table.HeadCell>Sorumlu </Table.HeadCell>
                      </Table.Head>
                      <Table.Body className="divide-y">
                        {strategicGoal.strategicActivities.map((strategicActivity) => (
                          <Table.Row key={strategicActivity._id}>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white"></Table.Cell>
                            <Table.Cell>{strategicActivity.title}</Table.Cell>
                            <Table.Cell>{strategicActivity.performanceIndicator}</Table.Cell>
                            <Table.Cell>{strategicActivity.performanceGoalCount}</Table.Cell>
                            {strategicPlan.period.map((period) => (
                              <Table.Cell key={period._id}>
                                <span className="flex flex-col">
                                  <span>{getPeriodGoal(strategicActivity, period._id).goal}</span>
                                  <span>{getPeriodGoal(strategicActivity, period._id).price}</span>
                                </span>
                              </Table.Cell>
                            ))}
                            <Table.Cell>{strategicActivity.responsible}</Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Fragment>
                  ))}
                </Table.Head>
              </Table>

              <div className="flex gap-4">
                <div className="w-[256px] h-min flex-shrink-0 grid grid-cols-1 items-start gap-4">
                  <Heading>Hedef</Heading>
                  {strategicPlan.strategicGoals.map((strategicGoal) => (
                    <div
                      className={classNames(
                        'h-min shadow hover:shadow-xl rounded-2xl px-2 py-6 select-none cursor-pointer',
                        {
                          'bg-gray-100': params.strategicGoalId === strategicGoal._id,
                        }
                      )}
                      key={strategicGoal._id}
                      onClick={() => toggleSelectedStrategicGoalId(strategicGoal._id)}
                    >
                      {strategicGoal.title}
                    </div>
                  ))}
                </div>
                <div className="flex-1 h-min">
                  <div className="grid grid-cols-1 gap-4">
                    <Heading>Faaliyetler</Heading>
                    {selectedStrategicGoal && (
                      <Suspense fallback={<Loading />}>
                        <StrategicActivityList
                          strategicActivities={selectedStrategicGoal.strategicActivities}
                        />
                      </Suspense>
                    )}
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
