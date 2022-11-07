import { getPath, getPeriodTitleByStrategicPlan } from '@/utils'
import { StrategicGoalShema } from '@/validations/StrategicPlanSchema'
import Divider from '@components/Divider'
import Input from '@components/Input'
import classNames from 'classnames'
import { Card, Table } from 'flowbite-react'
import { useFormik } from 'formik'
import { Fragment, lazy, Suspense, useCallback, useEffect, useMemo } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaCheck, FaPen, FaPlus } from 'react-icons/fa'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/Button'
import Loading from '../../components/Loading'
import { StrategicGoalService, StrategicPlanService } from '@services/index'
import Heading from './components/Heading'
import Hideable from './components/Hideable'
const StrategicActivityList = lazy(() => import('./components/StrategicActivityList'))

const StrategicPlanDetail = () => {
  const params = useParams()

  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [strategicPlan, setStrategicPlan] = useState(false)

  const [show, setShow] = useState(false)

  const [canEdit, setCanEdit] = useState(false)
  const [goalAddMode, setGoalAddMode] = useState(false)
  const [goalLoading, setGoalLoading] = useState(false)

  const toggleEditMode = () => {
    setCanEdit((x) => !x)
  }

  const goalFormik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: StrategicGoalShema,
    onSubmit: (values) => {
      setGoalLoading(true)
      StrategicGoalService.create({
        strategicPlan: params.strategicPlanId,
        title: values.title,
      })
        .then((response) => {
          goalFormik.resetForm()
          setCanEdit(false)
          setGoalAddMode(false)
          toast.success('Eklendi!')
          strategicPlan.strategicGoals
          setStrategicPlan((x) => ({ ...x, strategicGoals: x.strategicGoals.concat(response) }))
        })
        .finally(() => {
          setGoalLoading(false)
        })
    },
  })

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
        <Card>
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col items-center">
              <span className="text-xl">{strategicPlan.title}</span>
              <span className="text-xl">{getPeriodTitleByStrategicPlan(strategicPlan)}</span>
            </div>
            <Divider />
            <div className="flex gap-2 items-center">
              <Button onClick={() => setShow((show) => !show)}>
                {show ? 'Tabloyu Gizle' : 'Tabloyu Görüntüle'}
              </Button>
              <button
                className={classNames(
                  'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                  {
                    'bg-blue-500 hover:bg-blue-400 text-white': canEdit,
                    'bg-blue-100 hover:bg-blue-200 text-blue-500': !canEdit,
                  }
                )}
                onClick={toggleEditMode}
              >
                <FaPen />
              </button>
            </div>
            <Hideable show={show}>
              <Table striped={true}>
                <Table.Head>
                  <Table.HeadCell colSpan={9}>{strategicPlan.title}</Table.HeadCell>
                </Table.Head>
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
              </Table>
            </Hideable>

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
                {!goalLoading ? (
                  [
                    goalAddMode && canEdit && (
                      <div className="h-min">
                        <Input
                          label="Yeni Hedefi Ekleyiniz"
                          inline={1}
                          name="title"
                          value={goalFormik.values.title}
                          onChange={goalFormik.handleChange}
                          onBlur={goalFormik.handleBlur}
                        />
                        {goalFormik.errors.title && goalFormik.touched.title ? (
                          <div className="text-orange-500 text-sm font-light mt-1">
                            {goalFormik.errors.title}
                          </div>
                        ) : null}
                      </div>
                    ),
                    canEdit ? (
                      goalAddMode ? (
                        <button
                          onClick={goalFormik.submitForm}
                          className="m-auto inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-500"
                        >
                          <FaCheck />
                        </button>
                      ) : (
                        <button
                          onClick={() => setGoalAddMode(true)}
                          className="m-auto inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 hover:bg-blue-200 text-green-500"
                        >
                          <FaPlus />
                        </button>
                      )
                    ) : null,
                  ]
                ) : (
                  <div className="m-auto">
                    <Loading />
                  </div>
                )}
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
      )}
    </>
  )
}
export default StrategicPlanDetail
