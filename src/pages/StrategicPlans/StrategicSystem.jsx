import { search } from '@/icons'
import { dateFormat, getPath } from '@/utils'
import Button from '@components/Button'
import Divider from '@components/Divider'
import { Card } from 'flowbite-react'
import React, { Fragment, useEffect, useState } from 'react'
import { FaPlus, FaRegCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Loading from '../../components/Loading'
import { StrategicSystemService } from '../../services'

const StrategicSystem = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [strategicSystemList, setStrategicSystemList] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    setLoading(true)
    setError(false)

    StrategicSystemService.getAll()
      .then((response) => setStrategicSystemList(response))
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

  if (!strategicSystemList || !strategicSystemList?.length)
    return (
      <>
        <div className="text-center">
          <div className="p-4">
            <h1>Daha Önce Oluşturulan Hiç Stratejik Plan Bulunmamaktadır!</h1>
          </div>
          <div>
            <Button
              as={Link}
              to={getPath('strategicPlans.create')}
              className="inline-flex justify-center"
              variant="dark-0"
            >
              Stratejik Plan Ekle
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
      <div className="w-full">
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col items-center">
            <span className="text-xl">Stratejik Planlar</span>
          </div>
          <Divider />
        </div>
        <Card>
          <div className="grid grid-cols-1 gap-6">
            {strategicSystemList &&
              strategicSystemList.map((strategicSystem) => (
                <Fragment key={strategicSystem._id}>
                  <Card style={{ backgroundColor: '#F9FCFF' }}>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {strategicSystem.title} Yılı Stratejik Planı
                    </h5>
                    <hr />
                    <div className="ml-auto mt-auto flex items-center gap-2">
                      <FaRegCalendarAlt />
                      {dateFormat(strategicSystem.createdAt)}
                    </div>
                    <div className="ml-auto mt-auto flex items-center gap-2">
                      <Button
                        as={Link}
                        to={getPath('strategicSystem.detail', {
                          strategicSystemId: strategicSystem._id,
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

export default StrategicSystem
