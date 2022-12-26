import { AccreditationService } from '@services/index'
import { Button, Card, Modal } from 'flowbite-react'
import { forwardRef, Fragment, useImperativeHandle, useState } from 'react'
import { BsQuestionCircle } from 'react-icons/Bs'

const AccreditationAddModal = forwardRef(({ onSuccess }, ref) => {
  const [visibility, setVisibility] = useState(false)
  const [accreditationList, setAccreditationList] = useState(false)

  AccreditationService.getAll().then((response) => setAccreditationList(response))

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
          <h3 className="mb-5 text-xl font-normal bg-4">TOBB ODA/BORSA AKREDİTASYON STANDARDI</h3>
          <span>
            Bu iş Planını Kanıtlarıyla birlikte Eklemek İstediğiniz Standartları Seçiniz!{' '}
          </span>
          <div className="flex justify-center gap-4 py-4">
            <div className="grid grid-cols-1 gap-6">
              {accreditationList &&
                accreditationList.map((accreditation) => (
                  <Fragment key={accreditation._id}>
                    <Card style={{ backgroundColor: '#F9FCFF' }}>
                      <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {accreditation.heading}
                      </h5>
                    </Card>
                  </Fragment>
                ))}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
})

AccreditationAddModal.displayName = 'AccreditationAddModal'

export default AccreditationAddModal
