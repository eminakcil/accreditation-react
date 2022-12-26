import { getPath } from '@/utils'
import Button from '@components/Button'
import Divider from '@components/Divider'
import { ManuelPlanService } from '@services/index'
import { Card } from 'flowbite-react'
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ManuelPlanListCard from './components/ManuelPlanListCard'

const ManuelPlanList = () => {
  const [manuelPlanList, setManuelPlanList] = useState(false)

  ManuelPlanService.getAll().then((response) => setManuelPlanList(response))

  return (
    <>
      {' '}
      <hr />
      <div className="w-full">
        <div className="grid grid-cols-1 gap-6">
          <Divider />
        </div>
        <Card>
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Manuel Eklenen İş Planları
          </h5>
          <div>
            {manuelPlanList && manuelPlanList?.length > 0 ? (
              <ManuelPlanListCard manuelPlanList={manuelPlanList} />
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
        </Card>
      </div>
    </>
  )
}

export default ManuelPlanList
