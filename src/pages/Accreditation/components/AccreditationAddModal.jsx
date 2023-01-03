import Button from '@components/Button'
import Modal from '@components/Modal'
import { AccreditationService } from '@services/index'
import { useRef } from 'react'
import { forwardRef, useEffect, useState } from 'react'
import { BsQuestionCircle } from 'react-icons/Bs'
import { FaArrowLeft } from 'react-icons/fa'
import AccreditationSelect from './AccreditationSelect'

const AccreditationAddModal = forwardRef((props, ref) => {
  const [accreditationList, setAccreditationList] = useState(false)
  const selectRef = useRef()

  useEffect(() => {
    AccreditationService.getAll().then((response) => setAccreditationList(response))
  }, [])

  console.log(selectRef.current?.selectedItems)

  return (
    <Modal ref={ref}>
      <Button
        variant="dark-0"
        onClick={() => selectRef.current?.back()}
      >
        <FaArrowLeft />
      </Button>
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
