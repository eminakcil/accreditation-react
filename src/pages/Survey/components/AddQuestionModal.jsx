import classNames from 'classnames'
import { Button, ListGroup, Modal } from 'flowbite-react'
import { nanoid } from 'nanoid'
import { useEffect, useRef, useState } from 'react'
import { arrowLeft } from '../../../icons'
import RateQuestion from './RateQuestion'
import SelectQuestion from './SelectQuestion'
import TextQuestion from './TextQuestion'

const AddQuestionModal = ({ show, onClose, onSubmit, value }) => {
  const [questionType, setQuestionType] = useState(false)
  const [questionValue, setQuestionValue] = useState(value)

  /** @type {import("react").MutableRefObject<HTMLElement>} */
  const questionSelectRef = useRef()
  /** @type {import("react").MutableRefObject<HTMLElement>} */
  const ghostRef = useRef()
  /** @type {import("react").MutableRefObject<HTMLElement>} */
  const contentRef = useRef()

  useEffect(() => {
    if (questionSelectRef.current && ghostRef.current) calculateHeight()
  }, [questionType, questionSelectRef, ghostRef, show])

  const calculateHeight = () => {
    const element = questionType ? contentRef : questionSelectRef
    ghostRef.current.style.height = `${element.current.clientHeight}px`
  }

  const onChangeHandle = (data) => {
    setQuestionValue(data)
    calculateHeight()
  }

  const onSubmitHandle = () => {
    const data = { ...questionValue, id: nanoid() }
    onSubmit(data)
    setQuestionType(false)
    setQuestionValue(false)
    onClose()
  }

  return (
    <Modal
      show={show}
      onClose={onClose}
    >
      <Modal.Header>Soru Ekle</Modal.Header>
      <Modal.Body>
        <div className="relative h-min overflow-hidden">
          <div
            ref={questionSelectRef}
            className={classNames('absolute w-full left-0 z-10 transition-all duration-500', {
              'translate-x-0 opacity-100': !questionType,
              '-translate-x-full opacity-0': !!questionType,
            })}
          >
            <ListGroup>
              <ListGroup.Item active>Soru Tipi Seç</ListGroup.Item>
              <ListGroup.Item onClick={() => setQuestionType('yes/no')}>
                Evet / Hayır soru tipi
              </ListGroup.Item>
              <ListGroup.Item onClick={() => setQuestionType('text')}>
                Açık soru tipi
              </ListGroup.Item>
              <ListGroup.Item onClick={() => setQuestionType('select')}>
                Seçim listeli soru tipi
              </ListGroup.Item>
              <ListGroup.Item onClick={() => setQuestionType('rate')}>
                Derecelendirme soru tipi
              </ListGroup.Item>
            </ListGroup>
          </div>
          <div
            ref={contentRef}
            className={classNames(
              'absolute w-full flex flex-col gap-4 left-0 z-10 transition-all duration-500',
              {
                '-translate-x-0 opacity-100': !!questionType,
                'translate-x-full opacity-0': !questionType,
              }
            )}
          >
            <Button
              gradientDuoTone="cyanToBlue"
              size="xs"
              onClick={() => {
                setQuestionType(false)
              }}
            >
              <div className="flex gap-4 items-center text-white overflow-hidden">
                <span>{arrowLeft}</span> <span>Geri</span>
              </div>
            </Button>
            {(questionType === 'text' && <TextQuestion onChange={onChangeHandle} />) ||
              (questionType === 'select' && <SelectQuestion onChange={onChangeHandle} />) ||
              (questionType === 'rate' && <RateQuestion onChange={onChangeHandle} />) ||
              (questionType === 'yes/no' && (
                <SelectQuestion
                  onChange={onChangeHandle}
                  initalValue={[
                    { id: 1, value: 'Evet' },
                    { id: 2, value: 'Hayır' },
                  ]}
                  allowNewItem={false}
                  label="Evet / Hayır soru tipi"
                  editableItems={false}
                  allowMultiselectToggle={false}
                  multiSelect={false}
                />
              ))}
            <div className="mx-auto">
              <Button
                gradientDuoTone="pinkToOrange"
                onClick={onSubmitHandle}
              >
                Kaydet
              </Button>
            </div>
          </div>
          <div
            ref={ghostRef}
            className="opacity-0 z-0"
          ></div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
export default AddQuestionModal
