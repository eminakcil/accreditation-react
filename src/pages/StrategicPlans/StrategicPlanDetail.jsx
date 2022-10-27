import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../components/Button'
import Loading from '../../components/Loading'
import { StrategicPlanService } from '../../services'
import { dateFormat } from '../../utils'

const StrategicPlanDetail = () => {
  const { strategicPlanId } = useParams()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [strategicPlan, setStrategicPlan] = useState(false)

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
        <div className="flex flex-col">
          {/* StrategicPlanDetail - {strategicPlanId} */}
          {/* <pre>{JSON.stringify(strategicPlan, null, 2)}</pre> */}
          <span className="text-xl">{strategicPlan.title}</span>
          <span>
            {strategicPlan.period.at(0).title} - {strategicPlan.period.at(-1).title}
          </span>
          <span>{dateFormat(strategicPlan.createdAt)}</span>
        </div>
      )}
    </>
  )
}
export default StrategicPlanDetail
