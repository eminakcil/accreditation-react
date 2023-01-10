import { getPath } from '@/utils'
import Loading from '@components/Loading'
import { Button, Card, Label, Textarea, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { SurveyService, LogoService } from '../../services'
import AddQuestionModal from './components/AddQuestionModal'
import ImageModal from './components/ImageModal'
import SurveyForm from './components/SurveyForm'
import { plus } from '../../icons'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import Divider from '@components/Divider'

const Survey = () => {
  const [logos, setLogos] = useState(false)
  const [imageModalVisibility, setImageModalVisibility] = useState(false)
  const [questionModalVisibility, setQuestionModalVisibility] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedLogo, setSelectedLogo] = useState(false)

  const navigate = useNavigate()

  const [surveyData, setSurveyData] = useState({
    title: '',
    firstTitle: '',
    finishTitle: '',
    active: false,
    logo: false,
  })

  useEffect(() => {
    LogoService.list().then(setLogos)
  }, [])

  const [formData, setFormData] = useState([])

  const onDelete = (id) => {
    setFormData((x) => x.filter((item) => item.id !== id))
  }

  const submitHandle = () => {
    const questions = formData.map((formItem) => {
      switch (formItem.type) {
        case 'text':
          return {
            questionType: 'text',
            required: true,
            question: {
              title: formItem.value,
            },
          }
        case 'select':
          return {
            questionType: 'select',
            required: true,
            question: {
              title: formItem.title,
              multiSelect: formItem.multiSelect,
              options: formItem.selectItems
                .map((option) => ({ option: option.value.trim() }))
                .filter((option) => option.option.length !== 0),
            },
          }
        case 'rate':
          return {
            questionType: 'rate',
            required: true,
            question: {
              title: formItem.title,
              columnOptions: formItem.columns
                .map((column) => ({ column: column.value }))
                .filter(({ column }) => column.length !== 0),
              rowOptions: formItem.rows
                .map((row) => ({ row: row.value }))
                .filter(({ row }) => row.length !== 0),
            },
          }

        default:
          return undefined
      }
    })

    setLoading(true)
    SurveyService.newSurvey({
      firstTitle: surveyData.firstTitle,
      finishTitle: surveyData.finishTitle,
      active: surveyData.active,
      title: surveyData.title,
      logo: surveyData.logo,
      questions,
    })
      .then((response) => {
        toast.success('Kaydedildi', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })

        navigate(getPath('surveys'))
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const logoChangeHandle = (logo) => {
    setSelectedLogo(logo)
  }

  useEffect(() => {
    if (selectedLogo) setSurveyData((x) => ({ ...x, logo: selectedLogo._id }))
  }, [selectedLogo])

  return (
    <>
      <Card>
        <hr />
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col items-center">
            <span className="text-xl">Anket Oluştur</span>
          </div>
          <Divider />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-center">
            <div
              onClick={() => setImageModalVisibility(true)}
              className={classNames(
                'cursor-pointer select-none min-w-[104px] h-[104px] flex justify-center items-center',
                {
                  'bg-gray-300 rounded-2xl text-gray-700 hover:bg-gray-400 hover:text-gray-100':
                    !selectedLogo,
                }
              )}
            >
              {selectedLogo ? (
                <img
                  crossOrigin="anonymous"
                  src={'http://localhost:3000'.concat(selectedLogo.path)}
                  className="max-w-full max-h-full"
                />
              ) : (
                plus
              )}
            </div>
          </div>

          <div>
            <div className="mb-2 block">
              <Label value="Anket Başlığı" />
            </div>
            <TextInput
              value={surveyData.title}
              onChange={(e) => setSurveyData((x) => ({ ...x, title: e.target.value }))}
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label value="Selamlama / Giriş / Açıklama" />
            </div>
            <Textarea
              rows={4}
              value={surveyData.firstTitle}
              onChange={(e) => setSurveyData((x) => ({ ...x, firstTitle: e.target.value }))}
            />
          </div>

          <SurveyForm
            formData={formData}
            onDelete={onDelete}
          />

          <Button
            gradientDuoTone="tealToLime"
            onClick={() => setQuestionModalVisibility(true)}
          >
            Soru Ekle
          </Button>

          <div>
            <div className="mb-2 block">
              <Label value={'Özel "Teşekkür" Metni'} />
            </div>
            <Textarea
              rows={4}
              value={surveyData.finishTitle}
              onChange={(e) => setSurveyData((x) => ({ ...x, finishTitle: e.target.value }))}
            />
          </div>

          <Button
            gradientDuoTone="cyanToBlue"
            onClick={submitHandle}
            disabled={loading}
          >
            <div className="flex gap-3 items-center">{loading && <Loading size={5} />} Kaydet</div>
          </Button>
        </div>
        {logos && (
          <ImageModal
            show={imageModalVisibility}
            onClose={() => setImageModalVisibility(false)}
            logos={logos}
            onChange={logoChangeHandle}
          />
        )}
        <ImageModal
          show={imageModalVisibility}
          onClose={() => setImageModalVisibility(false)}
          onChange={logoChangeHandle}
        />
        <AddQuestionModal
          show={questionModalVisibility}
          onClose={() => setQuestionModalVisibility(false)}
          onSubmit={(data) => {
            setFormData((x) => [...x, data])
          }}
        />
      </Card>
    </>
  )
}

export default Survey
