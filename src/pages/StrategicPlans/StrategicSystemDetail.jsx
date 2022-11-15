import { Fragment } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../../components/Button'
import Loading from '../../components/Loading'
import { StrategicSystemService } from '../../services'
import { dateFormat, getPath } from '../../utils'
import { search } from '../../icons'
import { Card } from 'flowbite-react'
import Divider from '@components/Divider'

const StrategicSystemDetail = () => {
  const params = useParams() // strategicSystemId
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [strategicService, setStrategicService] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    setLoading(true)
    setError(false)

    StrategicSystemService.getById(params.strategicSystemId)
      .then((response) => {
        setStrategicService(response)
      })
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
      {strategicService && (
        <div className="w-full">
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col items-center">
              <span className="text-xl">
                {strategicService.title} Yılı Stratejik Planı Amaçları
              </span>
            </div>
            <Divider />
          </div>
          <Card>
            <div className="grid grid-cols-3 gap-6">
              {strategicService.strategicPlans.map((strategicPlan) => (
                <Fragment key={strategicPlan._id}>
                  <Card style={{ backgroundColor: '#F9FCFF' }}>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {strategicPlan.title}
                    </h5>
                    <hr />
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
      )}
    </>
  )
}
export default StrategicSystemDetail
