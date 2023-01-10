import { StrategicActivityShema } from '@/validations/StrategicPlanSchema'
import Loading from '@components/Loading'
import { StrategicActivityService } from '@services/index'
import Modal from '@components/Modal'
import { useFormik } from 'formik'
import { useCallback, useEffect, useRef } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import CreateActivityForm from './CreateActivityForm'
import SelectMember from '@components/SelectMember'

const CreateActivityModal = ({ show, onClose, periodList, onSubmit = () => {} }) => {
  const params = useParams()

  const modalRef = useRef()

  useEffect(() => {
    modalRef.current.setVisibility(show)
  }, [show])

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

  const [selectedUser, setSelectedUser] = useState(false)

  const handleSelectMemberClick = () => {
    setActiveViewOrder(1)
  }

  const handleMemberChange = (user) => {
    setSelectedUser(user)
    setActiveViewOrder(0)
    formik.setFieldValue('responsible', user._id)
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
          selectedUser={selectedUser}
        />
      ),
    },
    {
      name: 'selectMember',
      element: (
        <SelectMember
          handleMemberChange={handleMemberChange}
          selectedUser={selectedUser}
        />
      ),
    },
  ].map((item, index) => ({ ...item, order: index }))

  const [activeViewOrder, setActiveViewOrder] = useState(0)

  const calculateViewPosition = useCallback(
    (order) => {
      return (order - activeViewOrder) * 100
    },
    [views, activeViewOrder]
  )

  return (
    <Modal
      ref={modalRef}
      onClose={onClose}
    >
      <div className="relative h-[680px] overflow-hidden">
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
    </Modal>
  )
}
export default CreateActivityModal
