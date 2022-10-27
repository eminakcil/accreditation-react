import { useEffect } from 'react'
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
    <div>
      StrategicPlanDetail - {strategicPlanId}
      <pre>{JSON.stringify(strategicPlan, null, 2)}</pre>
    </div>
  )
}
export default StrategicPlanDetail
