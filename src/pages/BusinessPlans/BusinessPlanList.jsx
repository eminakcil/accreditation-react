import {
  BusinessPlanService,
  StrategicActivityService,
  StrategicPeriodService,
} from '@services/index'
import { Card, Dropdown } from 'flowbite-react'
import Loading from '../../components/Loading'
import React, { Fragment, useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { getPath } from '@/utils'
import { Link } from 'react-router-dom'
import Divider from '@components/Divider'
import Button from '@components/Button'
import PlanListCard from './components/PlanListCard'

const BusinessPlanList = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [businessPlanList, setBusinessPlanList] = useState(false)

  const [strategicPeriodList, setStrategicPeriodList] = useState(false)
  const [strategicActivityList, setStrategicActivityList] = useState(false)

  const [filter, setFilter] = useState({})

  const fetchData = () => {
    setLoading(true)
    setError(false)

    Promise.all([StrategicPeriodService.getAll(), StrategicActivityService.getAll()])
      .then(([strategicPeriodResponse, strategicActivityResponse]) => {
        setStrategicPeriodList(strategicPeriodResponse)

        setStrategicActivityList(strategicActivityResponse)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }

  const fetchBusinessPlanList = () => {
    BusinessPlanService.getAll(filter)
      .then((response) => setBusinessPlanList(response))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchBusinessPlanList()
  }, [filter])

  if (loading) return <Loading />

  if (error)
    return (
      <>
        Hata <Button onClick={fetchData}>Tekrar Dene</Button>
      </>
    )

  return (
    <>
      <hr />
      <div className="w-full">
        <div className="grid grid-cols-1 gap-6">
          <Divider />
        </div>
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              İş Planları
            </h5>
            <Dropdown
              label="Yıl Seç"
              inline={true}
            >
              {strategicPeriodList?.map?.((period) => (
                <Dropdown.Item
                  key={period._id}
                  onClick={() => setFilter((x) => ({ ...x, period: period._id }))}
                >
                  {period.year}
                </Dropdown.Item>
              ))}
            </Dropdown>
            <Dropdown
              label="Faaliyet Seç"
              inline={true}
            >
              {strategicActivityList?.map?.((activity) => (
                <Dropdown.Item
                  key={activity._id}
                  onClick={() => setFilter((x) => ({ ...x, activity: activity._id }))}
                >
                  {activity.title}
                </Dropdown.Item>
              ))}
            </Dropdown>
            <Dropdown
              label="Tamamlanma durumuna göre"
              inline={true}
            >
              <Dropdown.Item onClick={() => setFilter((x) => ({ ...x, statu: true }))}>
                Tamamlananlar
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setFilter((x) => ({ ...x, statu: false }))}>
                Henüz tamamlanmayanlar
              </Dropdown.Item>
            </Dropdown>
            <button
              type="button"
              onClick={() => setFilter({})}
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Tümünü Görüntüle
            </button>
          </div>
          <Divider />
          <div>
            {businessPlanList && businessPlanList?.length > 0 ? (
              <PlanListCard businessPlanList={businessPlanList} />
            ) : (
              <div className="text-center">
                <div className="p-4">
                  <h1>Daha Önce Oluşturulan Hiç İş Planı Bulunmamaktadır!</h1>
                </div>
                <div>
                  <Button
                    as={Link}
                    to={getPath('businessPlan.create')}
                    className="inline-flex justify-center"
                    variant="dark-0"
                  >
                    İş Planı Ekle
                    <div className="p-1">
                      {' '}
                      <FaPlus />
                    </div>
                  </Button>
                </div>
              </div>
            )}
          </div>
          {/* deneme */}
        </Card>
      </div>
    </>
  )
}

export default BusinessPlanList
