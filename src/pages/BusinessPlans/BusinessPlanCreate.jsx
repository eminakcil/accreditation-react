import { Button, Card, Checkbox, Label, Tabs, TextInput } from 'flowbite-react'
import React from 'react'
import { FaCalendar, FaCalendarPlus } from 'react-icons/fa'
import { useFormik } from 'formik'
// import Loading from '@components/Loading'
import { BusinessPlanShema } from '@/validations/BusinessPlanSchema'
import { BusinessPlanService } from '@services/index'

const BusinessPlanCreate = () => {
  //   const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      title: '',
      responsible: '',
      date: '',
      time: '',
      location: '',
    },
    validationSchema: BusinessPlanShema,
    onSubmit: (values) => {
      //   setLoading(true)

      BusinessPlanService.create({
        title: values.title,
        responsible: values.responsible,
        date: values.date,
        time: values.time,
        location: values.location,
      })
      // .then((response) => {
      //   formik.resetForm()
      //   toast.success('Ekleme Başarılıdır!')
      //   onSubmit(response)
      //   onClose()
      // })
      // .finally(() => setLoading(false))
    },
  })
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Tabs.Group
          aria-label="Tabs with icons"
          style="underline"
        >
          <Tabs.Item
            title="Mevcut İş Planı Kart Ekle"
            icon={FaCalendar}
          >
            <Card>
              <div className="flex flex-col gap-4">
                <div>
                  <div className="mb-2 block">
                    <Label
                      htmlFor="title"
                      color="green"
                      value="Faaliyet Adı"
                    />
                  </div>
                  <TextInput
                    id="title"
                    placeholder="Faaliyet Adı"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required={true}
                    color="green"
                    helperText={
                      <React.Fragment>
                        <span
                          className="font-medium"
                          style={{ color: 'red' }}
                        >
                          Dikkat!
                        </span>{' '}
                        Bu faaliyet daha önce performans göstergesinde tanımlanmış olmalıdır!
                      </React.Fragment>
                    }
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
                    />
                    <Label
                      htmlFor="disabled"
                      disabled={true}
                    >
                      Eligible for international shipping (disabled)
                    </Label>
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
          </Tabs.Item>
          <Tabs.Item
            active={true}
            title="Manuel İş Planı Kart Ekle"
            icon={FaCalendarPlus}
          >
            Manuel İş Planı Ekle
          </Tabs.Item>
        </Tabs.Group>
      </form>
    </>
  )
}

export default BusinessPlanCreate
