import { Button } from 'flowbite-react'
import { Fragment } from 'react'
import { trash } from '../../../icons'
import RateQuestion from './RateQuestion'
import SelectQuestion from './SelectQuestion'
import TextQuestion from './TextQuestion'

const SurveyForm = ({ formData, onDelete = () => {} }) => {
  return (
    <>
      {formData.map((formItem, index) => (
        <Fragment key={index}>
          {(formItem.type === 'text' && (
            <TextQuestion
              value={formItem.value}
              prefix={`${index + 1}. `}
            />
          )) ||
            (formItem.type === 'select' && (
              <SelectQuestion
                initalValue={formItem.selectItems}
                title={formItem.title}
                allowNewItem={formItem.allowNewItem}
                label={formItem.label}
                editableItems={formItem.editableItems}
                allowMultiselectToggle={formItem.allowMultiselectToggle}
                prefix={`${index + 1}. `}
              />
            )) ||
            (formItem.type === 'rate' && (
              <RateQuestion
                prefix={`${index + 1}. `}
                initialColumns={formItem.columns}
                initialRows={formItem.rows}
                initialTitle={formItem.title}
              />
            ))}
          <div>
            <Button
              gradientMonochrome="failure"
              size="xs"
              onClick={() => onDelete(formItem.id)}
            >
              {trash}
            </Button>
          </div>
        </Fragment>
      ))}
    </>
  )
}
export default SurveyForm
