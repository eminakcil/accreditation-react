import FormText from './FormText'

export default function Input({ label, inline = false, ...props }) {
  return (
    <>
      {!inline && (
        <label className="block mb-2">
          <FormText>{label}</FormText>
        </label>
      )}
      <input
        type="text"
        className="block w-full p-2.5 text-sm rounded-lg bg-gray-200 border border-gray-400 text-gray-700 placeholder-gray-500"
        placeholder={label}
        {...props}
      />
    </>
  )
}
