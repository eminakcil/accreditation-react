import { FaCheck } from 'react-icons/fa'

const SubmitButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="m-auto inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 hover:bg-orange-200 text-orange-500"
    >
      <FaCheck />
    </button>
  )
}
export default SubmitButton
