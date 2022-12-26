import constants from '@/constants'
import Divider from '@components/Divider'
import FileCard from '@components/FileCard'
import Loading from '@components/Loading'
import UploadInput from '@components/UploadInput'
import { BusinessPlanProofService } from '@services/index'
import { Button, Label, Textarea } from 'flowbite-react'
import { useFormik } from 'formik'
import { useRef } from 'react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

const BusinessPlanProofForm = ({ businessPlanId, onSuccess, initialValues }) => {
  const [loading, setLoading] = useState(false)

  const uploadFileRef = useRef()

  const formik = useFormik({
    initialValues: {
      description: initialValues?.description || '',
      fileList: [],
      businessPlan: businessPlanId,
    },
    onSubmit: (values, { setFieldValue }) => {
      setLoading(true)

      BusinessPlanProofService.create(values)
        .then((response) => {
          toast.success('Kanıt Kaydedildi!')
          onSuccess?.(response)
          setFieldValue('fileList', [])
          setFieldValue('businessPlan', businessPlanId)
          uploadFileRef.current.reset()
        })
        .finally(() => {
          setLoading(false)
        })
    },
  })

  return (
    <div className="max-w-xl">
      <div className="flex flex-col items-center pb-10">
        <img
          className="mb-3 h-24 w-24 rounded-full shadow-lg"
          src={constants.LOGO}
        />
        <span>İş Planı Kanıt Kartı</span>
      </div>
      <form onSubmit={formik.handleSubmit}>
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
            rows={4}
            value={formik.values.description}
            name="description"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div
          id="file"
          className="space-y-3"
        >
          <div className="mb-2 block">
            <Label
              htmlFor="file"
              value="Kanıt:"
            />
          </div>
          <UploadInput
            ref={uploadFileRef}
            onChange={(fileList) => formik.setFieldValue('fileList', fileList)}
          />
          {initialValues && (
            <>
              <Divider />
              {initialValues?.path?.map((path, index) => (
                <FileCard
                  key={index}
                  onRemove={() => null}
                >
                  {path}
                </FileCard>
              ))}
            </>
          )}
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
          <Button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: '#24475C', display: 'inline' }}
          >
            {loading && (
              <span className="mr-2">
                <Loading
                  size={6}
                  light
                />
              </span>
            )}
            Kanıt Kartını Kaydet
          </Button>
        </div>
      </form>
    </div>
  )
}
export default BusinessPlanProofForm
