import { Fragment } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Loading from '../../components/Loading'
import { StrategicPlanService } from '../../services'
import { getDate, getPath } from '../../utils'
import { search } from '../../icons'

const StrategicPlans = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [strategicPlanList, setStrategicPlanList] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    setLoading(true)
    setError(false)

    StrategicPlanService.getAll()
      .then((response) => setStrategicPlanList(response))
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
    <div className="grid grid-cols-3">
      {strategicPlanList &&
        strategicPlanList.map((strategicPlan) => (
          <Fragment key={strategicPlan._id}>
            <div className="flex flex-col w-full aspect-video shadow hover:shadow-xl rounded-2xl p-2">
              <span className="text-xl text-center">{strategicPlan.title}</span>
              <div className="ml-auto mt-auto flex items-center gap-2">
                {getDate(strategicPlan.createdAt)}
                <Button
                  as={Link}
                  to={getPath('strategicPlans.detail', { strategicPlanId: strategicPlan._id })}
                  className="inline-flex justify-center"
                  variant="dark-0"
                >
                  {search}
                </Button>
              </div>
            </div>
          </Fragment>
        ))}
    </div>
  )
}
export default StrategicPlans
