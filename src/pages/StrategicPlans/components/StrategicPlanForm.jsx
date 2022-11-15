import Loading from '@components/Loading'
import { StrategicSystemService } from '@services/index'
import classNames from 'classnames'
import { Button, Label, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'

const StrategicPlanForm = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [strategicSystemList, setStrategicSystemList] = useState([])
  const [selectedStrategicSystem, setSelectedStrategicSystem] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

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
    <div className="flex flex-col gap-3">
      <div className="flex flex-nowrap h-20 gap-3">
        {strategicSystemList.map((strategicSystem) => (
          <div
            className={classNames(
              'h-full aspect-video rounded-xl flex justify-center items-center font-bold text-white cursor-pointer select-none',
              {
                'bg-blue-600 outline outline-offset-1 outline-blue-700':
                  selectedStrategicSystem === strategicSystem._id,
                'bg-blue-400 hover:bg-blue-600': selectedStrategicSystem !== strategicSystem._id,
              }
            )}
            key={strategicSystem._id}
            onClick={() => {
              setSelectedStrategicSystem(strategicSystem._id)
            }}
          >
            {strategicSystem.title}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-8">
        <div>
          <div className="mb-2 block">
            <Label value="Başlangıç Yılı" />
          </div>
          <TextInput
            type="text"
            placeholder="Stratejik Plan Başlığı"
          />
        </div>
      </div>
      <div>
        <Button
          gradientDuoTone="cyanToBlue"
          type="submit"
          disabled={loading}
        >
          Stratejik Planı Oluştur
        </Button>
      </div>
    </div>
  )
}
export default StrategicPlanForm
