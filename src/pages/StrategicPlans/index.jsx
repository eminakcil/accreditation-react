import { Fragment } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import Loading from '../../components/Loading'
import { StrategicPlanService } from '../../services'
import { dateFormat, getPath } from '../../utils'
import { search } from '../../icons'
import { Card } from 'flowbite-react'

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

  // return (
  //   <div className="grid grid-cols-3 gap-4">
  // {strategicPlanList &&
  //   strategicPlanList.map((strategicPlan) => (
  //     <Fragment key={strategicPlan._id}>
  //       <div className="flex flex-col w-full aspect-video shadow hover:shadow-xl rounded-2xl p-2">
  //         <span className="text-xl text-center">{strategicPlan.title}</span>
  //         <span className="text-center">
  //           {strategicPlan.period.at(0)?.title} - {strategicPlan.period.at(-1)?.title}
  //         </span>
  //         <div className="ml-auto mt-auto flex items-center gap-2">
  //           {dateFormat(strategicPlan.createdAt)}
  //           <Button
  //             as={Link}
  //             to={getPath('strategicPlans.detail', { strategicPlanId: strategicPlan._id })}
  //             className="inline-flex justify-center"
  //             variant="dark-0"
  //           >
  //             {search}
  //           </Button>
  //         </div>
  //       </div>
  //     </Fragment>
  //   ))}
  //   </div>
  // )
  return (
    <>
      <hr />
      <div className="w-full">
        <Card>
          <div className="grid grid-cols-3 gap-6">
            {strategicPlanList &&
              strategicPlanList.map((strategicPlan) => (
                <Fragment key={strategicPlan._id}>
                  <Card style={{ backgroundColor: '#F9FCFF' }}>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {strategicPlan.title}
                    </h5>
                    <hr />
                    <h6>
                      {strategicPlan.period.at(0)?.title} - {strategicPlan.period.at(-1)?.title}{' '}
                      Yılı Stratejik Planı
                    </h6>
                    <div className="ml-auto mt-auto flex items-center gap-2">
                      {dateFormat(strategicPlan.createdAt)}
                    </div>
                    <div className="ml-auto mt-auto flex items-center gap-2">
                      <Button
                        as={Link}
                        to={getPath('strategicPlans.detail', {
                          strategicPlanId: strategicPlan._id,
                        })}
                        className="inline-flex justify-center"
                        variant="dark-0"
                      >
                        {search} Görüntüle
                      </Button>
                    </div>
                  </Card>
                </Fragment>
              ))}
          </div>
        </Card>
      </div>
    </>
  )
}
export default StrategicPlans
