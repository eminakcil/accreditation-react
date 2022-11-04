import { Button, Card, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { FaCheck, FaPlusCircle } from 'react-icons/fa'

const StrategicPlanCreate = () => {
  return (
    <>
      <Card>
        <Card style={{ backgroundColor: '#F9FCFF' }}>
          <div className="grid grid-cols-1 gap-6">
            <div className="flex flex-col gap-4">
              <div>
                <div className="mb-2 block">
                  <Label value="Stratejik Plan Amacı" />
                </div>
                <TextInput
                  id="strategicplan"
                  placeholder="Stratejik Plan Amacı"
                  required={true}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label value="Başlangıç Yılı" />
                </div>
                <TextInput
                  id="period"
                  placeholder="Stratejik Plan Başlangıç Yılı"
                  required={true}
                  color="red"
                  helperText={
                    <React.Fragment>
                      <span
                        className="font-medium"
                        style={{ color: 'red' }}
                      >
                        Dikkat!
                      </span>{' '}
                      <span style={{ color: 'grey' }}>
                        Stratejik Plan Başlangıç Yılından İtibaren 4 Yıllık Periyot Halinde
                        Düzenlenecektir!
                      </span>
                    </React.Fragment>
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div>
              <Button gradientDuoTone="cyanToBlue">Stratejik Planı Oluştur</Button>
            </div>
          </div>
        </Card>
        <Card style={{ backgroundColor: '#F9FCFF' }}>
          <div className="flex flex-col">
            <div className="mb-2 block">
              <Label value="Stratejik Hedef" />
            </div>
            <div className="inline-flex">
              <TextInput
                id="strategicplan"
                placeholder="Stratejik Plan Hedefi"
                required={true}
              />
              <div style={{ padding: '0.4%' }}>
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                  <FaCheck />
                </div>
              </div>
            </div>
          </div>
          <div style={{ padding: '1%', display: 'flex', justifyContent: 'center' }}>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-800 dark:text-blue-200">
              <FaPlusCircle className="h-5 w-5" />
            </div>
          </div>
        </Card>
      </Card>
    </>
  )
}

export default StrategicPlanCreate
