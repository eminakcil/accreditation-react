import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react'
import { useFormik } from 'formik'
import React, { useRef, useState } from 'react'
import { ManuelPlanShema } from '@/validations/ManuelPlanSchema'
import { ManuelPlanService, StrategicPeriodService } from '@services/index'
import toast from 'react-hot-toast'
import { errorInfo, getPath } from '@/utils'
import { useNavigate } from 'react-router-dom'
import Loading from '@components/Loading'
import SelectResponsibleModal from './SelectResponsibleModal'
import { useEffect } from 'react'
import classNames from 'classnames'

const ManuelPlanCard = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues: {
      title: '',
      responsible: '',
      date: '',
      time: '',
      location: '',
      period: '',
      statu: false,
    },
    validationSchema: ManuelPlanShema,
    onSubmit: (values) => {
      setLoading(true)

      ManuelPlanService.create({
        title: values.title,
        responsible: values.responsible,
        date: values.date,
        time: values.time,
        location: values.location,
        period: values.period,
        statu: values.statu,
      })
        .then(() => {
          formik.resetForm()
          toast.success('Ekleme Başarılıdır!')

          navigate(getPath('businessPlan'))
        })
        .finally(() => setLoading(false))
    },
  })

  const [selectedYearId, setSelectedYearId] = useState(false)
  const [periodList, setPeriodList] = useState(false)

  const responsibleModalRef = useRef(false)

  useEffect(() => {
    formik.setFieldValue('period', selectedYearId || '')
  }, [selectedYearId])

  useEffect(() => {
    const asyncFunc = async () => {
      setPeriodList(await StrategicPeriodService.getAll())
    }

    asyncFunc()
  }, [])

  return (
    <>
      <Card>
        <hr />
        <div className="grid lg:grid-cols-2 gap-3">
          <div className="relative">
            {loading && (
              <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                <Loading size={16} />
              </div>
            )}
            <form onSubmit={formik.handleSubmit}>
              <Card>
                <div className="flex gap-3">
                  {periodList &&
                    periodList?.map((period) => (
                      <button
                        key={period._id}
                        type="button"
                        className={classNames('px-2 rounded-md cursor-pointer select-none', {
                          'bg-gray-300 hover:bg-gray-500 text-gray-800 hover:text-gray-100':
                            selectedYearId !== period._id,
                          'bg-red-500 hover:bg-red-700 text-gray-100':
                            selectedYearId === period._id,
                        })}
                        onClick={() => setSelectedYearId(period._id)}
                      >
                        {period.year}
                      </button>
                    ))}
                </div>
                {errorInfo(formik, 'period')}
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="title"
                      color="red"
                      value="Başlık"
                    />
                  </div>
                  <TextInput
                    name="title"
                    placeholder="Başlık"
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
                      htmlFor="location"
                      color="red"
                      value="Faaliyetin Gerçekleşeceği Yer"
                    />
                  </div>
                  <TextInput
                    name="location"
                    placeholder="Faaliyetin gerçekleşeceği yer"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    color="red"
                  />
                  {errorInfo(formik, 'location')}
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
                      htmlFor="time"
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
            </form>
          </div>
          <Card>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, recusandae? Deleniti,
            qui.
          </Card>
        </div>
      </Card>

      <SelectResponsibleModal
        ref={responsibleModalRef}
        onMemberChange={(responsible) =>
          formik.setFieldValue('responsible', responsible?._id || '')
        }
      />
    </>
  )
}

export default ManuelPlanCard
