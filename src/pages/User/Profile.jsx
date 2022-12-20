import { Card } from 'flowbite-react'
import { useRef, useState } from 'react'

const Profile = () => {
  const fileInputRef = useRef()
  const [fileDataUrl, setfileDataUrl] = useState(false)

  const handleFileChange = (_e) => {
    const file = _e.target.files?.[0]

    if (file) {
      const fileReader = new FileReader()
      fileReader.onload = (e) => {
        const { result } = e.target
        if (result) {
          setfileDataUrl(result)
        }
      }
      fileReader.readAsDataURL(file)
    } else {
      setfileDataUrl(false)
    }
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg">
        <Card>
          <img
            onClick={() => {
              fileInputRef.current.click()
            }}
            src={fileDataUrl || '/src/assets/img/avatar.jpg'}
            className="rounded w-full aspect-square object-cover cursor-pointer hover:blur transition-all"
          />
          <input
            ref={fileInputRef}
            type="file"
            hidden
            onChange={handleFileChange}
          />
        </Card>
      </div>
    </div>
  )
}
export default Profile
