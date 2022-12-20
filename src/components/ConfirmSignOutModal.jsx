import { forwardRef, useImperativeHandle, useState } from 'react'
import { Button, Modal } from 'flowbite-react'
import { BsExclamationCircle } from 'react-icons/bs'
import { signOut } from '@/utils'

const ConfirmSignOutModal = forwardRef((props, ref) => {
  const [visibility, setVisibility] = useState(false)

  useImperativeHandle(ref, () => ({
    visibility,
    setVisibility,
  }))

  const handleClose = () => {
    setVisibility(false)
  }

  const handleConfirm = () => {
    signOut()
    handleClose()
  }

  return (
    <Modal
      show={visibility}
      size="md"
      popup={true}
      onClose={handleClose}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <BsExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
          <h3 className="mb-5 text-lg font-normal text-gray-500">
            Oturumunuz sonlandırılacak. Onaylıyor musunuz?
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              color="failure"
              onClick={handleConfirm}
            >
              Evet
            </Button>
            <Button
              color="gray"
              onClick={handleClose}
            >
              Hayır
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
})

ConfirmSignOutModal.displayName = 'ConfirmSignOutModal'

export default ConfirmSignOutModal
