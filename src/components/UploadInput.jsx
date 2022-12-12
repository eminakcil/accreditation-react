import { useState, useRef } from 'react'
import { SlClose } from 'react-icons/sl'
import { BsCardImage, BsFileEarmark, BsTable, BsUpload } from 'react-icons/Bs'
import { useEffect } from 'react'

const UploadInput = ({ onChange }) => {
  const [selectedFiles, setSelectedFiles] = useState([])

  const fileInputRef = useRef()

  useEffect(() => {
    onChange?.(selectedFiles)
  }, [selectedFiles])

  const handleChange = (event) => {
    setSelectedFiles(selectedFiles.concat(Array.prototype.slice.call(event.target.files)))

    fileInputRef.current.value = null
  }

  const handleRemove = (index) => {
    setSelectedFiles((x) => x.filter((value, _index) => _index !== index))
  }

  const types = {
    'image/jpeg': <BsCardImage />,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': <BsTable />,
  }

  return (
    <div className="space-y-3">
      <div
        className="py-3 bg-gray-50 hover:bg-gray-200 border border-solid border-gray-300 rounded-lg flex flex-col gap-1 items-center cursor-pointer select-none"
        onClick={() => fileInputRef.current.click()}
      >
        <BsUpload size={18} />
        <span className="font-light text-sm">(Dosya Ekle)</span>
      </div>
      <input
        type="file"
        hidden
        ref={fileInputRef}
        multiple
        onChange={handleChange}
      />
      {selectedFiles.map((file, index) => (
        <div
          key={index}
          className="bg-gray-50 border border-solid border-gray-300 rounded-lg flex items-stretch overflow-hidden"
        >
          <div className="bg-green-400 text-white p-4 grid place-items-center">
            {types?.[file.type] || <BsFileEarmark />}
          </div>
          <div className="max-w-full flex items-center py-2 px-4">{file.name}</div>
          <div
            className="hover:bg-gray-400 hover:text-white cursor-pointer p-4 grid place-items-center ml-auto"
            onClick={() => handleRemove(index)}
          >
            <SlClose />
          </div>
        </div>
      ))}
    </div>
  )
}
export default UploadInput
