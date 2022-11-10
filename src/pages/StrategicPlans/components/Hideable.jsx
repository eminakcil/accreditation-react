import { useEffect, useMemo, useRef, useState } from 'react'

const Hideable = ({ show, duration = 700, children }) => {
  const childrenElement = useRef(null)
  const [height, setHeight] = useState(0)
  const currentHeight = useMemo(() => {
    return show ? height : 0
  }, [height, show])

  useEffect(() => {
    if (childrenElement.current) {
      setHeight(childrenElement.current.offsetHeight)
    }
  }, [childrenElement.current])

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
