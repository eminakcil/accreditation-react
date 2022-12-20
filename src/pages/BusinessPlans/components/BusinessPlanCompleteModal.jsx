import { Button, Modal } from 'flowbite-react'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { BsQuestionCircle } from 'react-icons/Bs'

const BusinessPlanCompleteModal = forwardRef(({ onSuccess }, ref) => {
  const [visibility, setVisibility] = useState(false)

  useImperativeHandle(ref, () => ({
    visibility,
    setVisibility,
  }))

  const handleClose = () => {
    setVisibility(false)
  }

  return (
    <Modal
      show={visibility}
      popup={true}
      size="md"
      onClose={handleClose}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center text-gray-500">
          <BsQuestionCircle
            className="inline mb-4"
            size={32}
          />
          <h3 className="mb-5 text-lg font-normal bg-4">
            İş planı tamamlandı olarak işaretlensin mi?
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="gray"
              onClick={handleClose}
            >
              Hayır
            </Button>
            <Button
              color="success"
              onClick={onSuccess}
            >
              Evet
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
})

BusinessPlanCompleteModal.displayName = 'BusinessPlanCompleteModal'

export default BusinessPlanCompleteModal
