import { yearFormat } from '@/utils'
import Divider from '@components/Divider'
import Loading from '@components/Loading'
import Hideable from '@pages/StrategicPlans/components/Hideable'
import classNames from 'classnames'
import { Button, Card, FileInput, Label, Table, Textarea } from 'flowbite-react'
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
        <div>
          <Table>
            <Table.Head>
              <Table.HeadCell>İş Planı Detayları</Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Performans Göstergesi
                </Table.Cell>
                <Table.Cell>{items.activity.performanceIndicator}</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  İş Planının Gerçekleşeceği Tarih
                </Table.Cell>
                <Table.Cell>{yearFormat(items.date)}</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Gerçekleşme Saati
                </Table.Cell>
                <Table.Cell>{items.time}</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Konum
                </Table.Cell>
                <Table.Cell>{items.location}</Table.Cell>
              </Table.Row>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  Sorumlu
                </Table.Cell>
                <Table.Cell>{items.responsible}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <div>
            <Card>
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
                    gradientDuoTone="greenToBlue"
                  >
                    {show ? 'Kartı Gizle' : 'Kart Ekle'}
                  </Button>
                </div>
                <Hideable show={show}>
                  <Card>
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
                      <FileInput
                        id="file"
                        helperText="İş planının gerçekleştiğine dair tüm çıktıları buraya yükleyiniz!"
                      />
                    </div>
                    <div>
                      <Button gradientDuoTone="tealToLime">Kanıt Kartını Kaydet</Button>
                    </div>
                  </Card>
                </Hideable>
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </>
  )
}

export default BusinessPlanDetail
