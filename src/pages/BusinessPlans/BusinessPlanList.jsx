import { BusinessPlanService } from '@services/index'
import { Card, Dropdown } from 'flowbite-react'
import Loading from '../../components/Loading'
import React, { Fragment, useEffect, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { getPath, yearFormat } from '@/utils'
import { Link } from 'react-router-dom'
import Divider from '@components/Divider'
import classNames from 'classnames'
import { search } from '@/icons'
import Button from '@components/Button'

const BusinessPlanList = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [businessPlanList, setBusinessPlanList] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    setLoading(true)
    setError(false)

    BusinessPlanService.getAll()
      .then((response) => setBusinessPlanList(response))
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

  if (!businessPlanList || !businessPlanList?.length)
    return (
      <>
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
              <Dropdown.Item>2019</Dropdown.Item>
              <Dropdown.Item>2020</Dropdown.Item>
              <Dropdown.Item>2021</Dropdown.Item>
              <Dropdown.Item>2022</Dropdown.Item>
            </Dropdown>
            <Dropdown
              label="Faaliyet Seç"
              inline={true}
            >
              <Dropdown.Item>Faaliyet Seç</Dropdown.Item>
            </Dropdown>
            <Dropdown
              label="Tamamlanma durumuna göre"
              inline={true}
            >
              <Dropdown.Item>Tamamlananlar</Dropdown.Item>
              <Dropdown.Item>Henüz tamamlanmayanlar</Dropdown.Item>
            </Dropdown>
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              Tümünü Görüntüle
            </a>
          </div>
          <Divider />
          {/* deneme */}
          <div className="grid grid-cols-1 gap-6">
            {businessPlanList &&
              businessPlanList.map((businessPlanList) => (
                <Fragment key={businessPlanList._id}>
                  <Card>
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                      <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                          <div className="shrink-0">
                            <img
                              className="h-8 w-8 rounded-full"
                              src="/images/logo.png"
                              alt="Neil image"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                              Faaliyet Adı : {businessPlanList?.activity?.title}
                            </p>
                            <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                              Sorumlu : {businessPlanList.responsible}
                            </p>
                            <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                              Eğitim Yeri: {businessPlanList.location}
                            </p>
                          </div>
                          <div className="inline-flex flex-col items-center text-base font-semibold text-gray-900 dark:text-white">
                            {yearFormat(businessPlanList.date)} {businessPlanList.time}
                            <p
                              className={classNames('truncate text-sm ', {
                                'text-green-400': businessPlanList?.statu,
                                'text-red-500 animate-pulse': !businessPlanList?.statu,
                              })}
                            >
                              {businessPlanList?.statu ? 'Tamamlandı' : 'Tamamlanmadı'}
                            </p>
                            <div style={{ margin: '2% 0' }}>
                              <Button
                                as={Link}
                                to={getPath('businessPlan.detail', {
                                  id: businessPlanList._id,
                                })}
                                className="inline-flex justify-center"
                                variant="dark-0"
                                style={{ backgroundColor: 'white', color: 'grey' }}
                              >
                                {search} Görüntüle
                              </Button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </Card>
                </Fragment>
              ))}
          </div>
          {/* deneme */}
        </Card>
      </div>
    </>
  )
}

export default BusinessPlanList
