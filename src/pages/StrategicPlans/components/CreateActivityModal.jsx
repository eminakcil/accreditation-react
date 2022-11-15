import { StrategicActivityShema } from '@/validations/StrategicPlanSchema'
import Loading from '@components/Loading'
import { StrategicActivityService } from '@services/index'
import classNames from 'classnames'
import { Button, Modal } from 'flowbite-react'
import { useFormik } from 'formik'
import { Fragment, useCallback, useMemo } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import CreateActivityForm from './CreateActivityForm'
import SelectMember from './SelectMember'

const CreateActivityModal = ({ show, onClose, periodList, onSubmit = () => {} }) => {
  const params = useParams()

  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      title: '',
      performanceIndicator: '',
      responsible: '',
      performanceGoalCount: '',
      periodGoal: periodList.map((x) => ({
        strategicPeriod: x._id,
        goal: '',
        price: '',
      })),
    },
    validationSchema: StrategicActivityShema,
    onSubmit: (values) => {
      setLoading(true)
      StrategicActivityService.create({
        ...values,
        strategicGoal: params.strategicGoalId,
      })
        .then((response) => {
          formik.resetForm()
          toast.success('Faaliyet ve Performans Göstergesi Olşturuldu!')
          onSubmit({ ...response, strategicGoalId: params.strategicGoalId })
          onClose()
        })
        .catch(() => {
          toast.error('Oluşturulamadı!')
        })
        .finally(() => setLoading(false))
    },
  })

  const handleSelectMemberClick = () => {
    setActiveViewOrder(1)
  }

  const views = [
    {
      name: 'create',
      element: (
        <CreateActivityForm
          formik={formik}
          loading={loading}
          periodList={periodList}
          handleSelectMemberClick={handleSelectMemberClick}
        />
      ),
    },
    {
      name: 'selectMember',
      element: <SelectMember />,
    },
  ].map((item, index) => ({ ...item, order: index }))

  const [activeViewOrder, setActiveViewOrder] = useState(1)

  const calculateViewPosition = useCallback(
    (order) => {
      return (order - activeViewOrder) * 100
    },
    [views, activeViewOrder]
  )

  const nextView = () => {
    setActiveViewOrder((curr) => (curr === views.length - 1 ? 0 : curr + 1))
  }

  return (
    <Modal
      show={show}
      onClose={onClose}
    >
      <Modal.Header />
      <Modal.Body>
        <Button onClick={nextView}>toggleActiveViewName</Button>
        <div className="relative h-[560px] overflow-hidden">
          {loading && (
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
              <Loading size={16} />
            </div>
          )}
          {views.map((view) => (
            <div
              key={view.order}
              className="absolute w-full transition-transform duration-1000"
              style={{ transform: `translateX(${calculateViewPosition(view.order)}%)` }}
            >
              {view.element}
            </div>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  )
}
export default CreateActivityModal
