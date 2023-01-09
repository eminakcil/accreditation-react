import classNames from 'classnames'
import { useMemo } from 'react'
import { useState } from 'react'
import { BsChevronDown } from 'react-icons/Bs'

const Select = ({ title, options, onChange, value }) => {
  const [visibility, setVisibility] = useState(false)

  const selectedItem = useMemo(() => {
    if (value === undefined) return false
    return options.find((x) => x.value === value)
  }, [value, options])

  const mainTitle = useMemo(() => {
    if (selectedItem) return selectedItem.text
    return title
  }, [selectedItem])

  const toggleVisibility = () => setVisibility((x) => !x)

  const selectHandle = (value) => {
    onChange?.(value)
    setVisibility(false)
  }

  return (
    <div>
      <div
        className="max-w-[150px] flex items-center gap-1 p-3 rounded-xl select-none border border-solid border-slate-400 hover:bg-slate-100 cursor-pointer"
        onClick={toggleVisibility}
      >
        <span
          className="whitespace-nowrap text-ellipsis overflow-hidden"
          title={mainTitle}
        >
          {mainTitle}
        </span>
        <span>
          <BsChevronDown />
        </span>
      </div>
      <div
        className={classNames('relative', {
          hidden: !visibility,
        })}
      >
        <div className="absolute top-0 left-0 min-w-full mt-1">
          <div className="py-3 bg-white border border-solid border-slate-400 rounded-xl">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => selectHandle(option.value)}
                className="hover:bg-slate-200 text-gray-600 px-3 cursor-pointer"
              >
                {option.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Select
