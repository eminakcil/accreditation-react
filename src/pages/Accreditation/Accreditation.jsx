import Divider from '@components/Divider'
import { AccreditationService } from '@services/index'
import { Card } from 'flowbite-react'
import React, { Fragment, useEffect, useState } from 'react'
import Collapsable from './components/Collapsable'

const Accreditation = () => {
  const [accreditationList, setAccreditationList] = useState(false)

  useEffect(() => {
    AccreditationService.getAll().then((response) => setAccreditationList(response))
  }, [])

  return (
    <>
      <div className="space-y-3">
        <Divider thin />
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col items-center">
            <span className="text-xl">TOBB ODA/BORSA AKREDİTASYON STANDARDI</span>
          </div>
        </div>
        <Divider />
        <Card>
          <div className="grid grid-cols-1 gap-6">
            {accreditationList &&
              accreditationList.map((accreditation) => (
                <Collapsable
                  key={accreditation._id}
                  item={accreditation}
                />
              ))}
          </div>
        </Card>
      </div>
    </>
  )
}

export default Accreditation
