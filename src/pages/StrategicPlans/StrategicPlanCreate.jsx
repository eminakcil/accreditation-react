import { Button, Card, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { FaCheck } from 'react-icons/fa'

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
          <div>
            <div className="mb-2 block">
              <Label value="Stratejik Hedef" />
            </div>
            <TextInput
              id="strategicplan"
              placeholder="Stratejik Plan Hedefi"
              required={true}
            />
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <FaCheck></FaCheck>
            </div>
          </div>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <FaCheck></FaCheck>
          </div>
        </Card>
      </Card>
    </>
  )
}

export default StrategicPlanCreate
