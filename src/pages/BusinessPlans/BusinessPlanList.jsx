import {
  BusinessPlanService,
  StrategicActivityService,
  StrategicPeriodService,
} from '@services/index'
import { Card, Table } from 'flowbite-react'
import Loading from '../../components/Loading'
import React, { Fragment, useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { getPath, yearFormat } from '@/utils'
import { Link } from 'react-router-dom'
import Divider from '@components/Divider'
import Button from '@components/Button'
import PlanListCard from './components/PlanListCard'
import Hideable from '@pages/StrategicPlans/components/Hideable'
import Select from '@components/Select'

const BusinessPlanList = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [businessPlanList, setBusinessPlanList] = useState(false)

  const [strategicPeriodList, setStrategicPeriodList] = useState(false)
  const [strategicActivityList, setStrategicActivityList] = useState(false)

  const [show, setShow] = useState(false)

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

  const handleSelectChange = (value, key) => {
    setFilter((x) => ({ ...x, [key]: value }))
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
      <hr />
      <div className="w-full">
        <div className="grid grid-cols-1 gap-6">
          <Divider />
        </div>
        <Card>
          <div className="flex gap-2 items-center">
            <Button onClick={() => setShow((show) => !show)}>
              {show ? 'Tabloyu Gizle' : 'Tabloyu Görüntüle'}
            </Button>
          </div>
          <Hideable show={show}>
            <Table striped={true}>
              <Table.Head>
                <Table.HeadCell colSpan={9}>İş Planları</Table.HeadCell>
              </Table.Head>
              <Table.Head>
                <Table.HeadCell>Faaliyet Adı</Table.HeadCell>
                <Table.HeadCell>Plan Adı</Table.HeadCell>
                <Table.HeadCell>Tarih</Table.HeadCell>
                <Table.HeadCell>Saat</Table.HeadCell>
                <Table.HeadCell>Plan Tipi</Table.HeadCell>
                <Table.HeadCell>Sorumlu</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {businessPlanList &&
                  businessPlanList.map((businessPlanList) => (
                    <Table.Row key={businessPlanList._id}>
                      <Table.Cell>
                        {businessPlanList?.activity?.title ? businessPlanList?.activity?.title : ''}
                      </Table.Cell>
                      <Table.Cell>{businessPlanList.title}</Table.Cell>
                      <Table.Cell>{yearFormat(businessPlanList.date)}</Table.Cell>
                      <Table.Cell>{businessPlanList.time}</Table.Cell>
                      <Table.Cell>
                        {businessPlanList.planType == 'business' ? 'İş Planı' : 'Manuel İş Planı'}
                      </Table.Cell>
                      <Table.Cell>{businessPlanList.responsible.fullName}</Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </Hideable>
          <div className="mb-4 flex items-center justify-between gap-3">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              İş Planları
            </h5>
            {Array.isArray(strategicPeriodList) && (
              <Select
                title="Yıl Seç"
                options={strategicPeriodList?.map?.((period) => ({
                  text: period.year,
                  value: period._id,
                }))}
                value={filter?.period}
                onChange={(value) => handleSelectChange(value, 'period')}
              />
            )}
            {Array.isArray(strategicActivityList) && (
              <Select
                title="Faaliyet Seç"
                options={strategicActivityList?.map?.((activity) => ({
                  text: activity.title,
                  value: activity._id,
                }))}
                value={filter?.activity}
                onChange={(value) => handleSelectChange(value, 'activity')}
              />
            )}
            <Select
              title="Tamamlanma durumuna göre"
              options={[
                {
                  text: 'Tamamlananlar',
                  value: true,
                },
                {
                  text: 'Henüz tamamlanmayanlar',
                  value: false,
                },
              ]}
              value={filter?.statu}
              onChange={(value) => handleSelectChange(value, 'statu')}
            />
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
