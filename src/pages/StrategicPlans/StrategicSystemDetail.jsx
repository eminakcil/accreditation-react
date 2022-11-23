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
import { FaPlus, FaRegCalendarAlt } from 'react-icons/fa'

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
  if (!strategicService?.strategicPlans || !strategicService?.strategicPlans?.length)
    return (
      <>
        <div className="text-center">
          <div className="p-4">
            <h1>Bu Stratejik Plana Ait Hiç Stratejik Amaç Bulunmamaktadır!</h1>
          </div>
          <div>
            <Button
              as={Link}
              to={getPath('strategicPlans.create')}
              className="inline-flex justify-center"
              variant="dark-0"
            >
              Stratejik Amaç Ekle
              <div className="p-1">
                {' '}
                <FaPlus />
              </div>
            </Button>
          </div>
        </div>
      </>
    )

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
              {strategicService.strategicPlans.map((strategicPlan, index) => (
                <Card
                  key={index}
                  style={{ backgroundColor: '#F9FCFF' }}
                >
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {strategicPlan.title}
                  </h5>
                  <hr />
                  <h5> {strategicService.title}</h5>
                  <div className="ml-auto mt-auto flex items-center gap-2">
                    <FaRegCalendarAlt /> {dateFormat(strategicPlan.createdAt)}
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
              ))}
            </div>
          </Card>
        </div>
      )}
    </>
  )
}
export default StrategicSystemDetail
