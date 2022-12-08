import classNames from 'classnames'

const Divider = ({ thin = false }) => {
  return (
    <div
      className={classNames('border-b-[1px] border-solid', {
        'border-gray-300': thin,
        'border-gray-500': !thin,
      })}
    ></div>
  )
}
export default Divider
