import { StrategicPlanService } from '@services/index'
import { Button, Card, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import { StrategicPlanSchema } from '@/validations/StrategicPlanSchema'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { getPath } from '@/utils'

const StrategicPlanCreate = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      title: '',
      periodStartYear: '',
    },
    validationSchema: StrategicPlanSchema,
    onSubmit: (values) => {
      setLoading(true)
      StrategicPlanService.create({
        title: values.title,
        periodStartYear: values.periodStartYear,
      })
        .then((response) => {
          toast.success('Eklendi!')
          navigate(
            getPath('strategicPlans.detail', {
              strategicPlanId: response._id,
            })
          )
          console.log(response)
        })
        .catch((error) => {
          toast.error('Eklenemedi! :(((')
          console.log('aaa oouu bir hata aldım', error)
        })
        .finally(() => setLoading(false))
    },
  })

  return (
    <>
      <Card>
        <Card style={{ backgroundColor: '#F9FCFF' }}>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-col gap-8">
                <div>
                  <div className="mb-2 block">
                    <Label value="Stratejik Plan Amacı" />
                  </div>
                  <TextInput
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="title"
                    id="strategicplan"
                    placeholder="Stratejik Plan Amacı"
                    helperText={
                      <>
                        {formik.errors.title && formik.touched.title && <>{formik.errors.title}</>}
                      </>
                    }
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label value="Başlangıç Yılı" />
                  </div>
                  <TextInput
                    type="number"
                    max="9999"
                    value={formik.values.periodStartYear}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="periodStartYear"
                    id="period"
                    placeholder="Stratejik Plan Başlangıç Yılı"
                    color="red"
                    helperText={
                      <React.Fragment>
                        <span className="block">
                          {formik.errors.periodStartYear && formik.touched.periodStartYear && (
                            <>{formik.errors.periodStartYear}</>
                          )}
                        </span>
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
                <Button
                  gradientDuoTone="cyanToBlue"
                  type="submit"
                  disabled={loading}
                >
                  {loading && (
                    <>
                      <Spinner />
                      <span className="pl-3"></span>
                    </>
                  )}
                  Stratejik Planı Oluştur
                </Button>
              </div>
            </div>
          </form>
        </Card>
        {/* <Card style={{ backgroundColor: '#F9FCFF' }}>
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
        </Card> */}
        <div className="flex flex-col gap-4"></div>
      </Card>
    </>
  )
}

export default StrategicPlanCreate
