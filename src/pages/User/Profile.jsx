import constants from '@/constants'
import Button from '@components/Button'
import Loading from '@components/Loading'
import { UserService } from '@services/index'
import { setUser } from '@store/authSlice'
import { useAppDispatch, useAppSelector } from '@store/index'
import { Card } from 'flowbite-react'
import { useRef, useState } from 'react'

const Profile = () => {
  const fileInputRef = useRef()
  const [fileDataUrl, setfileDataUrl] = useState(false)

  const [file, setFile] = useState()

  const [loading, setLoading] = useState(false)
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

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

    setFile(file)
  }

  const handleClick = () => {
    setLoading(true)

    UserService.changeAvatar(file)
      .then(({ avatar }) => {
        setfileDataUrl(false)
        setFile(false)
        dispatch(setUser({ ...user, avatar }))
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg">
        <Card>
          <img
            onClick={() => {
              fileInputRef.current.click()
            }}
            src={fileDataUrl || constants.IMAGE_PREFIX + user.avatar}
            className="rounded w-full aspect-square object-cover cursor-pointer"
          />
          <input
            ref={fileInputRef}
            type="file"
            hidden
            onChange={handleFileChange}
          />
          {fileDataUrl && (
            <Button
              type="button"
              onClick={handleClick}
              className="flex items-center justify-center gap-3"
              disabled={loading}
            >
              {loading && (
                <span>
                  <Loading size={4} />
                </span>
              )}
              Kaydet
            </Button>
          )}
        </Card>
      </div>
    </div>
  )
}
export default Profile
