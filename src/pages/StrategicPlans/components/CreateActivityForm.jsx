import ErrorMessage from '@components/ErrorMessage'
import classNames from 'classnames'
import { Button, Label, TextInput } from 'flowbite-react'
import { forwardRef } from 'react'

const CreateActivityForm = forwardRef(
  ({ loading, periodList, formik, handleSelectMemberClick, selectedUser }, ref) => {
    return (
      <form
        ref={ref}
        onSubmit={formik.handleSubmit}
        className={classNames({
          'opacity-60': loading,
        })}
      >
        <div className="space-y-3 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          <h3 className="text-xl font-medium text-gray-900">Faaliyet Ekle</h3>

          <div>
            <div className="mb-2 block">
              <Label value="Faaliyet Başlığı" />
            </div>
            <TextInput
              placeholder="Faaliyet Başlığı"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.errors.title && formik.touched.title ? (
              <ErrorMessage>{formik.errors.title}</ErrorMessage>
            ) : null}
          </div>

          <div>
            <div className="mb-2 block">
              <Label value="Performans Göstergesi" />
            </div>
            <TextInput
              placeholder="Performans Göstergesi"
              name="performanceIndicator"
              value={formik.values.performanceIndicator}
              onChange={formik.handleChange}
            />
            {formik.errors.performanceIndicator && formik.touched.performanceIndicator ? (
              <ErrorMessage>{formik.errors.performanceIndicator}</ErrorMessage>
            ) : null}
          </div>

          <div>
            <div className="mb-2 block">
              <Label value="Sorumlu" />
            </div>
            {selectedUser && <div className="mb-2 block">{selectedUser.fullName}</div>}
            <Button onClick={handleSelectMemberClick}>Seç</Button>
            {formik.errors.responsible && formik.touched.responsible ? (
              <ErrorMessage>{formik.errors.responsible}</ErrorMessage>
            ) : null}
          </div>

          <div>
            <div className="mb-2 block">
              <Label value="Toplam Performans Hedefi" />
            </div>
            <TextInput
              placeholder="Toplam Performans Hedefi"
              name="performanceGoalCount"
              value={formik.values.performanceGoalCount}
              onChange={formik.handleChange}
            />
            {formik.errors.performanceGoalCount && formik.touched.performanceGoalCount ? (
              <ErrorMessage>{formik.errors.performanceGoalCount}</ErrorMessage>
            ) : null}
          </div>

          <div className="flex gap-4">
            {periodList.map((period, index) => (
              <div
                className="flex-1 space-y-1 text-center"
                key={period._id}
              >
                <span>{period.year}</span>
                <input
                  type="hidden"
                  name={`periodGoal.${index}.strategicPeriod`}
                  value={formik.values.periodGoal[index].strategicPeriod}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <TextInput
                  placeholder="Hedef"
                  name={`periodGoal.${index}.goal`}
                  value={formik.values.periodGoal[index].goal}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {/* {formik.errors.periodGoal?.[index].goal &&
        formik.touched.periodGoal?.[index].goal ? (
          <ErrorMessage>{formik.errors.periodGoal?.[index].goal}</ErrorMessage>
        ) : null} */}
                <TextInput
                  placeholder="Maliyet"
                  name={`periodGoal.${index}.price`}
                  value={formik.values.periodGoal?.[index].price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {/* {formik.errors.periodGoal?.[index].price &&
        formik.touched.periodGoal?.[index].price ? (
          <ErrorMessage>{formik.errors.periodGoal?.[index].price}</ErrorMessage>
        ) : null} */}
              </div>
            ))}
          </div>

          <div className="w-full">
            <Button
              gradientDuoTone="cyanToBlue"
              type="submit"
            >
              Kaydet
            </Button>
          </div>
        </div>
      </form>
    )
  }
)

CreateActivityForm.displayName = 'CreateActivityForm'

export default CreateActivityForm
