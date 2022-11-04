import Yup from './validation'

export const StrategicPlanSchema = Yup.object().shape({
  title: Yup.string().required(),
  periodStartYear: Yup.number().min(1000).max(9999).required(),
}).typeError('Bu alan geçerli bir yıl olmalıdır.')
