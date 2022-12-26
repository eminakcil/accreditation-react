import { yearFormat } from '@/utils'
import Divider from '@components/Divider'
import Loading from '@components/Loading'
import { ManuelPlanService } from '@services/index'
import { Card } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BusinessPlanProofForm from './components/BusinessPlanProofForm'
import BusinessPlanProofPreview from './components/BusinessPlanProofPreview'

const ManuelPlanDetail = () => {
  const { id } = useParams()

  const [items, setItems] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ManuelPlanService.getById(id)
      .then((res) => {
        setItems(res)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) return <Loading />

  return (
    <>
      <Card className="mx-auto my-3 col-xl-10 shadow">
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col items-center">
            <span className="text-xl">{items.title}</span>
          </div>
          <Divider />
        </div>
        <div className="grid lg:grid-cols-2 gap-3">
          <div className="w-full">
            <Card>
              <div className="max-w-xl">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  İş Planı Detayları
                </h5>
              </div>
              <div className="flow-root">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="py-4 sm:py-6">
                    <div className="flex items-center space-x-4"></div>
                  </li>
                  <hr />
                  <li className="py-3 sm:py-6">
                    <div className="flex items-center space-x-4">
                      <div className="shrink-0">
                        <img
                          className="h-8 w-8 rounded-full"
                          src="/images/pen.png"
                          alt="Bonnie image"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                          İş Planının Gerçekleşeceği Yer
                        </p>
                        <p className=" py-2 truncate text-sm text-gray-500 dark:text-gray-400">
                          {items.location}
                        </p>
                      </div>
                    </div>
                  </li>
                  <hr />
                  <li className="py-3 sm:py-6">
                    <div className="flex items-center space-x-4">
                      <div className="shrink-0">
                        <img
                          className="h-8 w-8 rounded-full"
                          src="/images/pen.png"
                          alt="Bonnie image"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                          İş Planının Gerçekleşeceği Tarih
                        </p>
                        <p className=" py-2 truncate text-sm text-gray-500 dark:text-gray-400">
                          {yearFormat(items.date)}
                        </p>
                      </div>
                    </div>
                  </li>
                  <hr />
                  <li className="py-3 sm:py-6">
                    <div className="flex items-center space-x-4">
                      <div className="shrink-0">
                        <img
                          className="h-8 w-8 rounded-full"
                          src="/images/pen.png"
                          alt="Michael image"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                          Gerçekleşme Saati
                        </p>
                        <p className=" py-2 truncate text-sm text-gray-500 dark:text-gray-400">
                          {items.time}
                        </p>
                      </div>
                    </div>
                  </li>
                  <hr />
                  <li className="py-3 sm:py-6">
                    <div className="flex items-center space-x-4">
                      <div className="shrink-0">
                        <img
                          className="h-8 w-8 rounded-full"
                          src="/images/pen.png"
                          alt="Lana image"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                          Faaliyet / İş Planı Adı
                        </p>
                        <p className=" py-2 truncate text-sm text-gray-500 dark:text-gray-400">
                          {items.title}
                        </p>
                      </div>
                    </div>
                  </li>
                  <hr />
                  <li className="pt-3 pb-0 sm:pt-6">
                    <div className="flex items-center space-x-4">
                      <div className="shrink-0">
                        <img
                          className="h-8 w-8 rounded-full"
                          src="/images/pen.png"
                          alt="Thomas image"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                          Sorumlu
                        </p>
                        <p className="py-2 truncate text-sm text-gray-500 dark:text-gray-400">
                          {items?.responsible.fullName}
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
          <div>
            <Card>
              <div className="py-2">
                {items.proof ? (
                  <BusinessPlanProofPreview
                    proof={items.proof}
                    completed={items.statu}
                    // handleComplete={handleComplete}
                  />
                ) : (
                  <BusinessPlanProofForm
                    businessPlanId={id}
                    initialValues={items.proof}
                    // onSuccess={handleProofSuccess}
                  />
                )}
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </>
  )
}

export default ManuelPlanDetail
