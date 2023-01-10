import Button from '@components/Button'
import Modal from '@components/Modal'
import { AccreditationService, BusinessPlanService } from '@services/index'
import { useRef } from 'react'
import { forwardRef, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { BsQuestionCircle } from 'react-icons/Bs'
import { FaArrowLeft, FaCheck } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import AccreditationSelect from './AccreditationSelect'

const AccreditationAddModal = forwardRef((props, ref) => {
  const [accreditationList, setAccreditationList] = useState(false)
  const selectRef = useRef()

  const [existingSelectedItems, setExistingSelectedItems] = useState([])

  const { id } = useParams()

  useEffect(() => {
    BusinessPlanService.getById(id).then((response) => {
      setExistingSelectedItems(response.accreditationList.map((x) => x._id))
    })
    AccreditationService.getAllNested().then((response) => setAccreditationList(response))
  }, [])

  const handleSubmit = () => {
    AccreditationService.addBusinessPlan({
      businessPlanId: id,
      accreditationIdList: selectRef.current?.selectedItems,
    }).then((response) => {
      toast.success('Değişiklikler Kaydedildi!')
      ref.current.setVisibility(false)
    })
  }

  return (
    <Modal ref={ref}>
      <div className="flex justify-between">
        <Button
          variant="dark-0"
          onClick={() => selectRef.current?.back()}
        >
          <FaArrowLeft />
        </Button>
        <Button
          variant="green"
          onClick={handleSubmit}
        >
          <FaCheck />
        </Button>
      </div>
      <div className="text-center text-gray-500 max-h-screen">
        <BsQuestionCircle
          className="inline mb-4"
          size={32}
        />
        <h3 className="mb-5 text-xl font-normal bg-4">TOBB ODA/BORSA AKREDİTASYON STANDARDI</h3>
        <span>Bu iş Planını Kanıtlarıyla birlikte Eklemek İstediğiniz Standartları Seçiniz! </span>
        <div className="flex justify-center gap-4 py-4">
          <div className="w-full grid grid-cols-1 gap-6">
            {accreditationList && (
              <AccreditationSelect
                ref={selectRef}
                accreditationList={accreditationList}
                sselectedItems={existingSelectedItems}
              />
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
})

AccreditationAddModal.displayName = 'AccreditationAddModal'

export default AccreditationAddModal
