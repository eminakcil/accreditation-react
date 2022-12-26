import Divider from '@components/Divider'
import { AccreditationService } from '@services/index'
import { Card } from 'flowbite-react'
import React, { Fragment, useState } from 'react'

const Accreditation = () => {
  const [accreditationList, setAccreditationList] = useState(false)

  AccreditationService.getAll().then((response) => setAccreditationList(response))

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
                <Fragment key={accreditation._id}>
                  <Card style={{ backgroundColor: '#F9FCFF' }}>
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {accreditation.heading}
                    </h5>
                    <hr />

                    {accreditation.rota.map((rota, index) => (
                      <Fragment key={rota._id}>
                        {index > 0 && (
                          <div className="self-center border-solid border-gray-500"></div>
                        )}
                        <span className="text-l font-semibold tracking-tight text-gray-900 dark:text-white">
                          {rota.title}
                        </span>
                        <hr />
                        {rota.rota2.map((rota2, index) => (
                          <Fragment key={rota2._id}>
                            {index > 0 && (
                              <div className="self-center border-solid border-gray-500"></div>
                            )}
                            <span>{rota2.title2}</span>
                          </Fragment>
                        ))}
                        <span></span>
                      </Fragment>
                    ))}
                    <div className="ml-auto mt-auto flex items-center gap-2"></div>
                  </Card>
                </Fragment>
              ))}
          </div>
        </Card>
      </div>
    </>
  )
}

export default Accreditation
