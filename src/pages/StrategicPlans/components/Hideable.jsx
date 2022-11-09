import { useMemo, useRef } from 'react'

const Hideable = ({ show, duration = 700, children }) => {
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
