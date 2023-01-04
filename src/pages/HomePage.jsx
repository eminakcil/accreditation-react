import { search } from '@/icons'
import { getPath } from '@/utils'
import { BusinessPlanService, StrategicPlanService, StrategicSystemService } from '@services/index'
import classNames from 'classnames'
import { Button, Card, Progress, Timeline } from 'flowbite-react'
import CButton from '@components/Button'
import { Fragment, useEffect, useState } from 'react'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const [businessPlanList, setBusinessPlanList] = useState(false)
  const [strategicSystemList, setStrategicSystemList] = useState(false)
  const [strategicPlanList, setStrategicPlanList] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    BusinessPlanService.getAll({ limit: 5, fromnow: true }).then(setBusinessPlanList)
    StrategicSystemService.getAll().then((response) => setStrategicSystemList(response))
    StrategicPlanService.getAll().then((response) => setStrategicPlanList(response))
  }

  return (
    <>
      <hr />
      <div className="w-full mt-12">
        <Card>
          <div className="grid gap-6">
            {strategicSystemList &&
              strategicSystemList.map((strategicPlan) => (
                <Fragment key={strategicPlan._id}>
                  <Card style={{ backgroundColor: '#F9FCFF' }}>
                    <a href="#">
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        2020- 2023 Stratejik Planı {strategicPlan.title}
                      </h5>
                      <hr />
                    </a>
                    <h6>Tamamlanma Oranı</h6>
                    <Progress
                      progress={45}
                      label="İstatistik"
                      labelPosition="outside"
                      labelProgress={true}
                    />
                    <div className="mt-2.5 mb-5 flex items-center">
                      <svg
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div className="flex items-center justify-between">
                      <Link
                        to={getPath('strategicSystem')}
                        className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Ayrıntıları Görüntüle
                      </Link>
                    </div>
                  </Card>
                </Fragment>
              ))}
          </div>
          <div className="grid grid-cols-3 gap-6">
            {strategicPlanList &&
              strategicPlanList.map((strategicPlan) => (
                <Fragment key={strategicPlan._id}>
                  <Card style={{ backgroundColor: '#F9FCFF' }}>
                    <a href="#">
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        2020- 2023 Stratejik Planı {strategicPlan.title}
                      </h5>
                      <hr />
                    </a>
                    <h6>Tamamlanma Oranı</h6>
                    <Progress
                      progress={45}
                      label="İstatistik"
                      labelPosition="outside"
                      labelProgress={true}
                    />
                    <div className="mt-2.5 mb-5 flex items-center">
                      <svg
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        className="h-5 w-5 text-yellow-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </Card>
                </Fragment>
              ))}
          </div>
          <div className="w-full">
            <Card style={{ backgroundColor: '#F9FCFF' }}>
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Yaklaşan Etkinlikler
              </h5>
              <Timeline>
                {businessPlanList &&
                  businessPlanList.map((businessPlan) => (
                    <Timeline.Item key={businessPlan._id}>
                      <Timeline.Point icon={FaRegCalendarAlt} />
                      <Timeline.Content>
                        <div className="flex">
                          <div className="flex-1">
                            <Timeline.Time>
                              {new Date(businessPlan.date).toLocaleDateString('tr-TR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}{' '}
                              {businessPlan.time}
                            </Timeline.Time>
                            <Timeline.Title>{businessPlan.title}</Timeline.Title>
                            <Timeline.Body>
                              Sorumlu :{businessPlan?.responsible?.fullName}
                            </Timeline.Body>
                          </div>
                          <div className="inline-flex flex-col items-center text-base font-semibold text-gray-900 dark:text-white">
                            <p
                              className={classNames('truncate text-sm ', {
                                'text-green-400': businessPlan?.statu,
                                'text-red-500 animate-pulse': !businessPlan?.statu,
                              })}
                            >
                              {businessPlan?.statu ? 'Tamamlandı' : 'Tamamlanmadı'}
                            </p>
                            <div style={{ margin: '2% 0' }}>
                              <CButton
                                as={Link}
                                to={getPath('businessPlan.detail', {
                                  id: businessPlan._id,
                                })}
                                className="inline-flex justify-center"
                                variant="dark-0"
                                style={{ backgroundColor: '#F9FCFF', color: 'grey' }}
                              >
                                {search} Görüntüle
                              </CButton>
                            </div>
                          </div>
                        </div>
                      </Timeline.Content>
                    </Timeline.Item>
                  ))}
              </Timeline>
              <Link
                to={getPath('businessPlan')}
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Tümünü Görüntüle
              </Link>
            </Card>
          </div>
          <div className="flex-1 mt-12">
            <Card style={{ backgroundColor: '#F9FCFF' }}>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                2021 İş Planları İçin
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Son 1 aylık rapor analizi yapıldı indirmek için Raporları İndir butonuna tıklayınız.
              </p>
              <Button>
                Raporları İndir
                <svg
                  className="ml-2 -mr-1 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </Card>
          </div>
        </Card>
      </div>
    </>
  )
}
export default HomePage
