import classNames from 'classnames'
import { FaPen } from 'react-icons/fa'

const EditButton = ({ onClick, canEdit = false }) => {
  return (
    <button
      className={classNames('inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', {
        'bg-blue-500 hover:bg-blue-400 text-white': canEdit,
        'bg-blue-100 hover:bg-blue-200 text-blue-500': !canEdit,
      })}
      onClick={onClick}
    >
      <FaPen />
    </button>
  )
}
export default EditButton
