import { Modal, Button } from 'flowbite-react'
import { arrowLeft, plus, upload } from '../../../icons'
import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import Input from '../../../components/Input'
import { LogoService } from '../../../services'

const ImageModal = ({ show, onClose, onChange }) => {
  const [logos, setLogos] = useState(false)

  const [logoState, setLogoState] = useState('select') // 'select' | 'upload'
  const [title, setTitle] = useState('')

  const ghostRef = useRef()
  const selectLogoRef = useRef()
  const uploadLogoRef = useRef()

  const fileInputRef = useRef(false)
  const [selectedFile, setSelectedFile] = useState(false)
  const [selectedFileDataUrl, setSelectedFileDataUrl] = useState(false)

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = (cb = () => {}) =>
    LogoService.list().then((response) => {
      setLogos(response)
      cb()
    })

  const fileChangeHandle = (files) => {
    if (files.length > 0) setSelectedFile(files[0])
  }

  useEffect(() => {
    if (selectedFile) {
      const fileReader = new FileReader()
      fileReader.onload = (e) => {
        const { result } = e.target
        if (result) {
          setSelectedFileDataUrl(result)
        }
      }
      fileReader.readAsDataURL(selectedFile)
    }
  }, [selectedFile])

  useEffect(() => {
    if (ghostRef.current && selectLogoRef.current && uploadLogoRef.current) calculateHeight()
  }, [show, logoState, ghostRef, selectLogoRef, uploadLogoRef])

  const calculateHeight = () => {
    const element =
      logoState === 'upload'
        ? uploadLogoRef.current
        : logoState === 'select'
        ? selectLogoRef.current
        : false
    ghostRef.current.style.height = `${element.clientHeight}px`
  }

  const logoClickHandle = (logo) => {
    onChange?.(logo)
    onClose()
  }

  const uploadClickHandle = () => {
    setLogoState('upload')
  }

  const submitHandle = () => {
    LogoService.newLogo({ title, logo: selectedFile }).then((response) => {
      loadImages(() => {
        setLogoState('select')
        setTitle('')
        fileInputRef.current.value = ''
        setSelectedFileDataUrl(false)
        calculateHeight()
        logoClickHandle(response)
      })
    })
  }

  return (
    <Modal
      show={show}
      onClose={onClose}
    >
      <Modal.Header>Logo Seç</Modal.Header>
      <Modal.Body>
        <div className="relative h-min overflow-hidden">
          <div
            ref={selectLogoRef}
            className={classNames(
              'absolute top-0 grid grid-cols-3 w-full gap-3 z-10 transition-all duration-500',
              {
                '-translate-x-full': logoState !== 'select',
                'translate-x-0': logoState === 'select',
              }
            )}
          >
            {logos &&
              logos.map((logo) => (
                <div
                  key={logo._id}
                  className="aspect-square flex justify-center items-center border border-solid border-gray-200 hover:shadow-2xl cursor-pointer active:bg-gray-100"
                  onClick={() => logoClickHandle(logo)}
                >
                  <img
                    crossOrigin="anonymous"
                    src={'http://localhost:3000'.concat(logo.path)}
                    className="max-w-full max-h-full"
                  />
                </div>
              ))}
            <div
              className="relative aspect-square flex justify-center items-center border border-solid border-gray-200 hover:shadow-2xl cursor-pointer active:bg-gray-100"
              onClick={uploadClickHandle}
            >
              {upload}
            </div>
          </div>
          <div
            ref={uploadLogoRef}
            className={classNames(
              'absolute top-0 w-full flex flex-col gap-3 z-10 transition-all duration-500',
              {
                'translate-x-full': logoState !== 'upload',
                'translate-x-0': logoState === 'upload',
              }
            )}
          >
            <div className="ml-0.5">
              <Button
                gradientDuoTone="cyanToBlue"
                size="xs"
                onClick={() => setLogoState('select')}
              >
                <div className="flex gap-4 items-center text-white overflow-hidden">
                  <span>{arrowLeft}</span> <span>Geri</span>
                </div>
              </Button>
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              className={classNames(
                'h-[128px] flex justify-center items-center self-center cursor-pointer',
                {
                  'w-[128px] bg-gray-100 hover:bg-gray-300 border border-solid border-gray-200 rounded-2xl text-gray-800 ':
                    !selectedFileDataUrl,
                  'w-auto': selectedFileDataUrl,
                }
              )}
            >
              {selectedFileDataUrl ? (
                <img
                  src={selectedFileDataUrl}
                  className="max-w-full max-h-full"
                />
              ) : (
                plus
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => fileChangeHandle(e.target.files)}
            />

            <Input
              label="Başlık"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="ml-auto">
              <Button onClick={submitHandle}>Kaydet</Button>
            </div>
          </div>
          <div
            ref={ghostRef}
            className="opacity-0 z-0 duration-500"
          ></div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
export default ImageModal
