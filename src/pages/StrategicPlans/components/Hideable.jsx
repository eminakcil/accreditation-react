import { useMemo, useRef } from 'react'

const Hideable = ({ show, children }) => {
  const childrenElement = useRef()
  const currentHeight = useMemo(() => {
    if (childrenElement.current) {
      return show ? childrenElement.current.offsetHeight : 0
    }
    return 0
  }, [show, childrenElement])

  return (
    <div className="relative overflow-hidden">
      <div
        style={{ height: currentHeight }}
        className="transition-all duration-700"
      ></div>
      <div
        className="absolute bottom-0"
        ref={childrenElement}
      >
        {children}
      </div>
    </div>
  )
}
export default Hideable
