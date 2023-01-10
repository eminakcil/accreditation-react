import { StrategicSystemService } from '@services/index'
import { Button, Label, Spinner, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { StrategicSystemSchema } from '@/validations/StrategicSystemSchema'

const StrategicSystemForm = ({ handleCreateSystem = () => {} }) => {
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      periodStartYear: '',
    },
    validationSchema: StrategicSystemSchema,
    onSubmit: (values) => {
      setLoading(true)
      StrategicSystemService.create({
        periodStartYear: values.periodStartYear,
      })
        .then((response) => {
          toast.success('Eklendi!')
          handleCreateSystem(response)
        })
        .catch((error) => {
          toast.error('Eklenemedi! :(((')
        })
        .finally(() => setLoading(false))
    },
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-8">
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
  )
}
export default StrategicSystemForm
