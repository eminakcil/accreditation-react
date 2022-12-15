import constants from '@/constants'
import Button from '@components/Button'
import FileCard from '@components/FileCard'
import { Card, Label } from 'flowbite-react'
import { useRef } from 'react'
import { BsCheck } from 'react-icons/Bs'
import BusinessPlanCompleteModal from './BusinessPlanCompleteModal'

const BusinessPlanProofPreview = ({ proof, handleComplete, completed }) => {
  const modalRef = useRef()

  const onSuccess = () => {
    modalRef.current.setVisibility(false)

    handleComplete()
  }

  return (
    <>
      <Card>
        <div className="flex flex-col items-center pb-10">
          <img
            className="mb-3 h-24 w-24 rounded-full shadow-lg"
            src={constants.LOGO}
          />
          <span>İş Planı Kanıt Kartı</span>
        </div>
        <div className="border border-solid border-gray-300 p-3 rounded-md">
          <div className="block mb-2 space-y-2">
            <Label value="Açıklama:" />
            <p>{proof.description}</p>
          </div>
          <div className="space-y-3">
            <Label value="Kanıt" />
            {proof?.path?.map((path, index) => (
              <FileCard
                key={index}
                isRemovable={false}
              >
                {path}
              </FileCard>
            ))}
          </div>
          {!completed && (
            <div className="py-2">
              <Button
                type="button"
                variant="dark-blue"
                className="flex items-center gap-2"
                onClick={() => {
                  modalRef.current.setVisibility(true)
                }}
              >
                <BsCheck size={28} />
                <span>Tamamlandı olarak işaretle</span>
              </Button>
            </div>
          )}
        </div>
      </Card>
      <BusinessPlanCompleteModal
        ref={modalRef}
        onSuccess={onSuccess}
      />
    </>
  )
}
export default BusinessPlanProofPreview
