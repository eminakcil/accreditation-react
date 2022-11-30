import SelectMember from '@components/SelectMember'
import { Modal } from 'flowbite-react'
import { forwardRef, useImperativeHandle, useState } from 'react'

const SelectResponsibleModal = forwardRef(({ onMemberChange }, ref) => {
  const [visibility, setVisibility] = useState(false)
  const [selectedResponsible, setSelectedResponsible] = useState(false)

  useImperativeHandle(ref, () => ({
    selectedResponsible,
    visibility,
    setVisibility,
  }))

  const handleClose = () => {
    setVisibility(false)
  }

  const handleMemberChange = (responsible) => {
    setSelectedResponsible(responsible)
    onMemberChange(responsible)
    handleClose()
  }

  return (
    <Modal
      show={visibility}
      onClose={handleClose}
    >
      <Modal.Header />
      <Modal.Body>
        <SelectMember
          handleMemberChange={handleMemberChange}
          selectedUser={selectedResponsible}
        />
      </Modal.Body>
    </Modal>
  )
})

SelectResponsibleModal.displayName = SelectResponsibleModal
export default SelectResponsibleModal
