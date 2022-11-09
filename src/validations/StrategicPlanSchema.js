import Yup from './validation'

export const StrategicPlanSchema = Yup.object()
  .shape({
    title: Yup.string().required(),
    periodStartYear: Yup.number().min(1000).max(9999).required(),
  })
  .typeError('Bu alan geçerli bir yıl olmalıdır.')

export const StrategicGoalShema = Yup.object().shape({
  title: Yup.string().required(),
})

export const StrategicActivityShema = Yup.object().shape({
  title: Yup.string().required(),
  performanceIndicator: Yup.string().required(),
  responsible: Yup.string().required(),
  performanceGoalCount: Yup.number().required(),
  periodGoal: Yup.array().of(
    Yup.object().shape({
      strategicPeriod: Yup.string().required(),
      goal: Yup.number().required(),
      price: Yup.number().required(),
    })
  ),
})
