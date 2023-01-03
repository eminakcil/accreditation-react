import { createPortal } from 'react-dom'
import Button from '@components/Button'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import classNames from 'classnames'
import { BsX } from 'react-icons/Bs'

const Modal = forwardRef(({ duration = 300, children }, ref) => {
  const [visibility, setVisibility] = useState(false)
  const [hidden, setHidden] = useState(true)

  useImperativeHandle(ref, () => ({
    setVisibility,
  }))

  useEffect(() => {
    if (visibility) {
      setHidden(false)
    } else {
      setTimeout(() => {
        setHidden(true)
      }, duration)
    }
  }, [visibility])

  return createPortal(
    <div
      className={classNames(
        'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-xl h-screen py-4 transition-opacity',
        {
          invisible: hidden,
          'opacity-0': !visibility,
          'block opacity-100': visibility,
        }
      )}
      style={{ transitionDuration: `${duration}ms` }}
    >
      <div
        className={classNames(
          'relative flex flex-col min-h-[5rem] h-full p-5 rounded-xl bg-gray-50 space-y-3 border border-solid shadow-lg'
        )}
      >
        <div className="flex justify-between">
          <Button
            className="ml-auto"
            onClick={() => setVisibility(false)}
          >
            <BsX />
          </Button>
        </div>
        <div className="h-full overflow-auto">{children}</div>
      </div>
    </div>,
    document.body
  )
})

Modal.displayName = 'Modal'

export default Modal
