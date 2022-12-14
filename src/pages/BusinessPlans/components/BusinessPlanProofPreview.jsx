import constants from '@/constants'
import Button from '@components/Button'
import FileCard from '@components/FileCard'
import { Label } from 'flowbite-react'
import { BsCheck } from 'react-icons/Bs'

const BusinessPlanProofPreview = ({ proof }) => {
  return (
    <div className="max-w-xl">
      <div className="flex flex-col items-center pb-10">
        <img
          className="mb-3 h-24 w-24 rounded-full shadow-lg"
          src={constants.LOGO}
        />
        <span>İş Planı Kanıt Kartı</span>
      </div>
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
      <div className="py-2">
        <Button
          variant="dark-blue"
          className="flex items-center gap-2"
        >
          <BsCheck size={28} />
          <span>Tamamlandı olarak işaretle</span>
        </Button>
      </div>
    </div>
  )
}
export default BusinessPlanProofPreview
