import constants from '@/constants'
import { yearFormat } from '@/utils'
import Divider from '@components/Divider'
import Loading from '@components/Loading'
import Hideable from '@pages/StrategicPlans/components/Hideable'
import { Button, Card, FileInput, Label, Textarea } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BusinessPlanService } from '../../services'

const BusinessPlanDetail = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState(false)
  const [show, setShow] = useState(true)

  useEffect(() => {
    BusinessPlanService.getById(id)
      .then((res) => {
        console.log(items)
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
            <span className="text-xl">{items.activity.title} Faaliyeti İş Planı</span>
          </div>
          <Divider />
        </div>
        <div className="grid lg:grid-cols-2 gap-3">
          <div className="">
            <div className="max-w-xl">
              <Card>
                <div className="max-w-xl">
                  <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    İş Planı Detayları
                  </h5>
                </div>
                <div className="flow-root">
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="py-4 sm:py-6">
                      <div className="flex items-center space-x-4">
                        <div className="shrink-0">
                          <img
                            className="h-8 w-8 rounded-full"
                            src="/images/pen.png"
                            alt="Neil image"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                            Performans Göstergesi
                          </p>
                          <p className="py-2 truncate text-sm text-gray-500 dark:text-gray-400">
                            {items.activity.performanceIndicator}
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
                            {items.location}
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
                            {items?.responsible?.fullName}
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>
          <div>
            <div className="py-2">
              <span
                className="font-medium"
                style={{ color: 'red' }}
              >
                Dikkat!
              </span>{' '}
              <span style={{ color: 'grey' }}>
                İş planının tamamlanması için Kart eklemelisiniz!
              </span>
              <div className="py-4">
                <Button
                  onClick={() => setShow((show) => !show)}
                  outline={true}
                  gradientDuoTone="greenToBlue"
                >
                  {show ? 'Kartı Gizle' : 'Kart Ekle'}
                </Button>
              </div>
              <Hideable show={show}>
                <div className="max-w-xl">
                  <div className="flex flex-col items-center pb-10">
                    <img
                      className="mb-3 h-24 w-24 rounded-full shadow-lg"
                      src={constants.LOGO}
                    />
                    <span>İş Planı Kanıt Kartı</span>
                  </div>
                  <div id="description">
                    <div className="mb-2 block">
                      <Label
                        htmlFor="description"
                        value="Açıklama:"
                      />
                    </div>
                    <Textarea
                      id="description"
                      placeholder="Açıklama..."
                      required={true}
                      rows={4}
                    />
                  </div>
                  <div id="file">
                    <div className="mb-2 block">
                      <Label
                        htmlFor="file"
                        value="Kanıt:"
                      />
                    </div>
                    <FileInput id="file" />
                    <span
                      className="font-medium"
                      style={{ color: 'red' }}
                    >
                      Dikkat!
                    </span>{' '}
                    <span style={{ color: 'grey' }}>
                      İş planının gerçekleştiğine dair tüm çıktıları buraya yükleyiniz!
                    </span>
                  </div>
                  <div className="py-2">
                    <Button style={{ backgroundColor: '#24475C' }}>Kanıt Kartını Kaydet</Button>
                  </div>
                </div>
              </Hideable>
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}

export default BusinessPlanDetail
