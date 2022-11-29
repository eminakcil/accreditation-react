import { Button, Card, Checkbox, Label, Tabs, TextInput } from 'flowbite-react'
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { FaCalendar, FaCalendarPlus } from 'react-icons/fa'
import { useFormik } from 'formik'
import Loading from '@components/Loading'
import { BusinessPlanShema } from '@/validations/BusinessPlanSchema'
import { BusinessPlanService, StrategicActivityService } from '@services/index'
import Hideable from '@pages/StrategicPlans/components/Hideable'
import StrategicActivityCard from './components/StrategicActivityCard'
import { useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getPath } from '@/utils'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '@components/ErrorMessage'
import ManuelPlanCard from './components/ManuelPlanCard'

const BusinessPlanCreate = ({ handleSelectMemberClick, selectedUser }) => {
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const strategicActivityId = useMemo(() => searchParams.get('strategicActivity'), [searchParams])

  const formik = useFormik({
    initialValues: {
      responsible: '',
      date: '',
      time: '',
      location: '',
      activity: strategicActivityId,
      period: '',
      statu: false,
    },
    validationSchema: BusinessPlanShema,
    onSubmit: (values) => {
      setLoading(true)

      BusinessPlanService.create({
        responsible: values.responsible,
        date: values.date,
        time: values.time,
        location: values.location,
        activity: values.activity,
        period: values.period,
        statu: values.statu,
      })
        .then(() => {
          formik.resetForm()
          toast.success('Ekleme Başarılıdır!')

          navigate(getPath('businessPlanList'))
        })
        .finally(() => setLoading(false))
    },
  })

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
                <div className="flex flex-col gap-4">
                  <Hideable show={!!strategicActivity}>
                    <div>
                      {strategicActivity && (
                        <StrategicActivityCard strategicActivity={strategicActivity} />
                      )}
                    </div>
                  </Hideable>
                  <hr />
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="period"
                        color="red"
                        value="Yıl"
                      />
                    </div>
                    <TextInput
                      id="period"
                      placeholder="Yıl"
                      value={formik.values.period}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required={true}
                      color="red"
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="location"
                        color="red"
                        value="Faaliyetin Gerçekleşeceği Yer"
                      />
                    </div>
                    <TextInput
                      id="location"
                      placeholder="Faaliyetin gerçekleşeceği yer"
                      value={formik.values.location}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required={true}
                      color="red"
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="date"
                        color="red"
                        value="Faaliyet Tarihi"
                      />
                    </div>
                    <TextInput
                      id="date"
                      type="date"
                      value={formik.values.date}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required={true}
                      color="red"
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="time"
                        color="red"
                        value="Faaliyetin Gerçekleşeceği Saat"
                      />
                    </div>
                    <TextInput
                      id="time"
                      type="time"
                      required={true}
                      value={formik.values.time}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      color="red"
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label
                        htmlFor="person"
                        color="red"
                        value="Sorumlu"
                      />
                    </div>
                    <TextInput
                      id="person"
                      name="responsible"
                      placeholder="Sorumlu"
                      value={formik.values.responsible}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required={true}
                      color="red"
                    />
                  </div>
                  <div>
                    <div className="mb-2 block">
                      <Label value="Sorumlu" />
                    </div>
                    {selectedUser && <div className="mb-2 block">{selectedUser.fullName}</div>}
                    <Button onClick={handleSelectMemberClick}>Seç</Button>
                    {formik.errors.responsible && formik.touched.responsible ? (
                      <ErrorMessage>{formik.errors.responsible}</ErrorMessage>
                    ) : null}
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
                </div>
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
    </>
  )
}

export default BusinessPlanCreate
