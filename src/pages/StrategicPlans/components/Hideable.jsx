import { useMemo, useRef } from 'react'
import { useSize } from '@/hooks'

const Hideable = ({ show, duration = 700, children }) => {
  const childrenElement = useRef(null)
  const size = useSize(childrenElement)
  const height = useMemo(() => size?.height || 0, [size])
  const currentHeight = useMemo(() => {
    return show ? height : 0
  }, [height, show])

  return (
    <div className="relative overflow-hidden">
      <div
        style={{ height: currentHeight, transitionDuration: `${duration}ms` }}
        className="transition-all"
      ></div>
      <div
        className="absolute bottom-0 w-full"
        ref={childrenElement}
      >
        {children}
      </div>
    </div>
  )
}
export default Hideable
