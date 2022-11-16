import { getPath } from '@/utils'
import { StrategicPlanSchema } from '@/validations/StrategicPlanSchema'
import Loading from '@components/Loading'
import { StrategicPlanService, StrategicSystemService } from '@services/index'
import classNames from 'classnames'
import { Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useFormik } from 'formik'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const StrategicPlanForm = forwardRef((props, ref) => {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [strategicSystemList, setStrategicSystemList] = useState([])
  const [selectedStrategicSystem, setSelectedStrategicSystem] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const selectSystem = (systemId) => {
    setSelectedStrategicSystem(systemId)
    formik.setFieldValue('strategicSystem', systemId)
  }

  useImperativeHandle(ref, () => ({
    createAndSelectSystem(system) {
      // setStrategicSystemList((x) => x.concat(system))
      selectSystem(system._id)
    },
  }))

  const formik = useFormik({
    initialValues: {
      strategicSystem: '',
      title: '',
    },
    validationSchema: StrategicPlanSchema,
    onSubmit: (values) => {
      setLoading(true)
      StrategicPlanService.create({
        title: values.title,
        strategicSystem: values.strategicSystem,
      })
        .then((response) => {
          toast.success('Eklendi!')
          navigate(
            getPath('strategicSystem.detail', {
              strategicSystemId: response._id,
            })
          )
          console.log(response)
        })
        .catch((error) => {
          toast.error('Eklenemedi! :(((')
          console.log('Eklenemedi', error)
        })
        .finally(() => setLoading(false))
    },
  })

  const fetchData = () => {
    setLoading(true)

    StrategicSystemService.getAll()
      .then(setStrategicSystemList)
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }

  if (loading) return <Loading />

  if (error)
    return (
      <>
        Hata <Button onClick={fetchData}>Tekrar Dene</Button>
      </>
    )

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-3">
        <div className="mb-2 block">
          <Label value="Stratejik Plan Yılı" />
        </div>
        <div className="flex flex-nowrap h-20 gap-3">
          {strategicSystemList.map((strategicSystem) => (
            <div
              className={classNames(
                'h-full aspect-video rounded-xl flex justify-center items-center font-bold text-white cursor-pointer select-none',
                {
                  'bg-blue-600 outline outline-offset-1 outline-blue-700':
                    selectedStrategicSystem === strategicSystem._id,
                  'bg-blue-400 hover:bg-blue-700': selectedStrategicSystem !== strategicSystem._id,
                }
              )}
              key={strategicSystem._id}
              onClick={() => selectSystem(strategicSystem._id)}
            >
              {strategicSystem.title}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-8">
          <div>
            <div className="mb-2 block">
              <Label value="Stratejik Plan Amacı" />
            </div>
            <TextInput
              type="text"
              placeholder="Stratejik Plan Amacı"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="title"
            />
          </div>
        </div>
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
})

StrategicPlanForm.displayName = 'StrategicPlanForm'

export default StrategicPlanForm
