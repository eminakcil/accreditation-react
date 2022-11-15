import Yup from './validation'

export const StrategicSystemSchema = Yup.object()
  .shape({
    periodStartYear: Yup.number().min(1000).max(9999).required(),
  })
  .typeError('Bu alan geçerli bir yıl olmalıdır.')
