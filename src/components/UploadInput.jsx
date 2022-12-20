import { useState, useRef, forwardRef } from 'react'
import { BsCardImage, BsTable, BsUpload } from 'react-icons/Bs'
import { useEffect } from 'react'
import FileCard from './FileCard'
import { useImperativeHandle } from 'react'

const UploadInput = forwardRef(({ onChange }, ref) => {
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

  const reset = () => {
    setSelectedFiles([])
  }

  useImperativeHandle(ref, () => ({
    reset,
  }))

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
        <FileCard
          key={index}
          icon={types?.[file.type]}
          onRemove={() => handleRemove(index)}
        >
          {file.name}
        </FileCard>
      ))}
    </div>
  )
})

UploadInput.displayName = 'UploadInput'

export default UploadInput
