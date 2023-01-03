import { Button, Card, Checkbox, Label, Tabs, TextInput } from 'flowbite-react'
import React, { useEffect, useMemo, useState, useRef } from 'react'
import { FaCalendar, FaCalendarPlus, FaPlus } from 'react-icons/fa'
import { useFormik } from 'formik'
import Loading from '@components/Loading'
import { BusinessPlanShema } from '@/validations/BusinessPlanSchema'
import { BusinessPlanService, StrategicActivityService } from '@services/index'
import Hideable from '@pages/StrategicPlans/components/Hideable'
import StrategicActivityCard from './components/StrategicActivityCard'
import { Link, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { errorInfo, getPath } from '@/utils'
import { useNavigate } from 'react-router-dom'
import ManuelPlanCard from './components/ManuelPlanCard'
import SelectResponsibleModal from './components/SelectResponsibleModal'
import LinkButton from '@components/Button'
import PlanListCard from './components/PlanListCard'

const BusinessPlanCreate = () => {
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const strategicActivityId = useMemo(() => searchParams.get('strategicActivity'), [searchParams])

  const [selectedPeriod, setSelectedPeriod] = useState()

  const formik = useFormik({
    initialValues: {
      responsible: '',
      date: '',
      time: '',
      title: '',
      activity: strategicActivityId,
      period: '',
      statu: false,
      planType: 'business',
    },
    validationSchema: BusinessPlanShema,
    onSubmit: (values) => {
      setLoading(true)

      BusinessPlanService.create({
        responsible: values.responsible,
        date: values.date,
        time: values.time,
        title: values.title,
        activity: values.activity,
        period: values.period,
        statu: values.statu,
        planType: values.planType,
      })
        .then(() => {
          formik.resetForm()
          toast.success('Ekleme Başarılıdır!')

          navigate(getPath('businessPlan.create'))
        })
        .finally(() => setLoading(false))
    },
  })

  useEffect(() => {
    formik.setFieldValue('period', selectedPeriod?._id || '')
  }, [selectedPeriod])

  const [strategicActivity, setStrategicActivity] = useState(false)

  const getActivity = async () => {
    const response = await StrategicActivityService.getById(strategicActivityId)

    setStrategicActivity(response)
  }

  useEffect(() => {
    if (strategicActivityId) {
      getActivity()
    }
  }, [])

  const responsibleModalRef = useRef(false)

  const [businessPlanList, setBusinessPlanList] = useState()

  useEffect(() => {
    if (strategicActivityId) {
      ;(async function () {
        setBusinessPlanList(
          await BusinessPlanService.getAll({
            activity: strategicActivityId,
            ...(selectedPeriod && { period: selectedPeriod._id }),
          })
        )
      })()
    }
  }, [selectedPeriod, strategicActivityId])

  return (
    <>
      <div className="relative">
        {loading && (
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <Loading size={16} />
          </div>
        )}
        <Tabs.Group
          aria-label="Tabs with icons"
          style="underline"
        >
          <Tabs.Item
            title="Mevcut İş Planı Kart Ekle"
            icon={FaCalendar}
          >
            <form onSubmit={formik.handleSubmit}>
              <Card>
                {strategicActivityId && strategicActivityId?.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    <Hideable show={!!strategicActivity}>
                      <div>
                        {strategicActivity && (
                          <StrategicActivityCard
                            strategicActivity={strategicActivity}
                            onYearChange={setSelectedPeriod}
                          />
                        )}
                      </div>
                      {errorInfo(formik, 'period')}
                    </Hideable>
                    <hr />
                    <div className="grid lg:grid-cols-2 gap-3">
                      <Card>
                        <div>
                          <div className="mb-2 block">
                            <Label
                              color="red"
                              value="Faaliyet / İş Planı Adı"
                            />
                          </div>
                          <TextInput
                            name="title"
                            placeholder="Faaliyet / İş Planı Adı"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            color="red"
                          />
                          {errorInfo(formik, 'title')}
                        </div>
                        <div>
                          <div className="mb-2 block">
                            <Label
                              color="red"
                              value="Faaliyet Tarihi"
                            />
                          </div>
                          <TextInput
                            name="date"
                            type="date"
                            value={formik.values.date}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            color="red"
                          />
                          {errorInfo(formik, 'date')}
                        </div>
                        <div>
                          <div className="mb-2 block">
                            <Label
                              color="red"
                              value="Faaliyetin Gerçekleşeceği Saat"
                            />
                          </div>
                          <TextInput
                            name="time"
                            type="time"
                            value={formik.values.time}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            color="red"
                          />
                          {errorInfo(formik, 'time')}
                        </div>
                        <div>
                          <div className="mb-2 block">
                            <Label value="Sorumlu" />
                          </div>
                          {responsibleModalRef.current.selectedResponsible && (
                            <div className="mb-2 block">
                              {responsibleModalRef.current.selectedResponsible.fullName}
                            </div>
                          )}
                          <Button onClick={() => responsibleModalRef.current.setVisibility(true)}>
                            Seç
                          </Button>
                          {errorInfo(formik, 'responsible')}
                        </div>
                        <div className="mb-2 block">
                          <Label
                            htmlFor="warning"
                            color="red"
                            value="Uyarı"
                          />
                        </div>
                        <div
                          className="flex flex-col gap-4"
                          id="checkbox"
                        >
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="oneday"
                              defaultChecked={true}
                            />
                            <Label htmlFor="promotion">1 gün kala uyarı mesajı gönder!</Label>
                            <div className="text-gray-500 dark:text-gray-300">
                              <span className="text-xs font-normal">
                                Bu uyarı mesajı zaten her iş planında otomatik olarak aktif olarak
                                ayarlanmıştır!
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox id="oneweek" />
                            <Label htmlFor="age">1 hafta kala uyarı mesajı gönder!</Label>
                          </div>
                          <div className="flex gap-2">
                            <div className="flex h-5 items-center">
                              <Checkbox id="shipping" />
                            </div>
                            <div className="flex flex-col">
                              <Label htmlFor="shipping">15 gün kala uyarı mesajı gönder!</Label>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="disabled"
                              disabled={true}
                              defaultChecked={true}
                            />
                            <Label
                              htmlFor="disabled"
                              disabled={true}
                            >
                              1 ay kala uyarı mesajı gönder!
                            </Label>
                            <div className="text-gray-500 dark:text-gray-300">
                              <span className="text-xs font-normal">
                                Bu uyarı mesajı zaten her iş planında otomatik olarak aktif olarak
                                ayarlanmıştır!
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="w-full">
                          <Button
                            gradientDuoTone="cyanToBlue"
                            type="submit"
                          >
                            Kaydet
                          </Button>
                        </div>
                      </Card>
                      <Card>
                        {businessPlanList && businessPlanList?.length > 0 ? (
                          <PlanListCard businessPlanList={businessPlanList} />
                        ) : (
                          <>
                            <div className="text-center">Seçili yıla ait hiç iş planı yok!</div>
                          </>
                        )}
                      </Card>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="p-4">
                      <h1>İş planı eklemek için önce stratejik faaliyet seçmelisiniz!</h1>
                    </div>
                    <div>
                      <LinkButton
                        as={Link}
                        to={getPath('strategicSystem')}
                      >
                        <div className="inline-flex items-center justify-center gap-3">
                          <span>Faaliyet Seç</span>
                          <FaPlus className="inline" />
                        </div>
                      </LinkButton>
                    </div>
                  </div>
                )}
              </Card>
            </form>
          </Tabs.Item>
          <Tabs.Item
            title="Manuel İş Planı Kart Ekle"
            icon={FaCalendarPlus}
          >
            <ManuelPlanCard />
          </Tabs.Item>
        </Tabs.Group>
      </div>

      <SelectResponsibleModal
        ref={responsibleModalRef}
        onMemberChange={(responsible) =>
          formik.setFieldValue('responsible', responsible?._id || '')
        }
      />
    </>
  )
}

export default BusinessPlanCreate
