import { FaPlus } from 'react-icons/fa'

const AddButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="m-auto inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 hover:bg-blue-200 text-green-500"
    >
      <FaPlus />
    </button>
  )
}
export default AddButton
