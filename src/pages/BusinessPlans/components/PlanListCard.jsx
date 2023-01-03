import constants from '@/constants'
import { search } from '@/icons'
import { getPath, yearFormat } from '@/utils'
import Button from '@components/Button'
import classNames from 'classnames'
import { Card } from 'flowbite-react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'

const PlanListCard = ({ businessPlanList }) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-6">
        {businessPlanList.map((businessPlanList) => (
          <Fragment key={businessPlanList._id}>
            <Card>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="shrink-0">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={constants.LOGO}
                        alt="Neil image"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        Plan Adı : {businessPlanList.title}
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        Sorumlu : {businessPlanList?.responsible?.fullName}
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
                          style={{ backgroundColor: '#F9FCFF', color: 'grey' }}
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
    </>
  )
}

export default PlanListCard
