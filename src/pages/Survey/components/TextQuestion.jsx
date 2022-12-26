import { Label, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'

const TextQuestion = ({ prefix = '', value = '', onChange = () => {} }) => {
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    onChange({
      type: 'text',
      value: inputValue,
    })
  }, [inputValue])

  return (
    <div>
      <div className="mb-2 block">
        <Label value={`${prefix}Açık Soru Tipi`} />
      </div>
      <TextInput
        type="text"
        placeholder="Soru başlığı"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  )
}
export default TextQuestion
