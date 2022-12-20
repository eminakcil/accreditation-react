import { BsFileEarmark } from 'react-icons/Bs'
import { SlClose } from 'react-icons/sl'

const FileCard = ({ isRemovable = true, onRemove, children, icon }) => {
  return (
    <div className="bg-gray-50 border border-solid border-gray-300 rounded-lg flex items-stretch overflow-hidden">
      <div className="bg-green-400 text-white p-4 grid place-items-center">
        {icon || <BsFileEarmark />}
      </div>
      <div className="max-w-full flex items-center py-2 px-4">{children}</div>
      {isRemovable && (
        <div
          className="hover:bg-gray-400 hover:text-white cursor-pointer p-4 grid place-items-center ml-auto"
          onClick={onRemove}
        >
          <SlClose />
        </div>
      )}
    </div>
  )
}
export default FileCard
