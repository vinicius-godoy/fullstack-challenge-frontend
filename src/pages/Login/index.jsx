import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'

const Input = props => (
  <input {...props} className="w-full bg-transparent p-4 border rounded-xl border-onix text-lg outline-none focus:border-platinum" />
)

const validationSchema = yup.object({
  email: yup.string().required('Digite seu email').email('E-mail inválido'),
  password: yup.string().required('Digite sua senha')
})

export const Login = ({ signInUser }) => {
  const formik = useFormik({
    onSubmit: async values => {
      const res = await axios
        .get('http://localhost:9901/login', {
          auth: {
            username: values.email,
            password: values.password,
          }
        })

      signInUser(res.data)
    },
    initialValues: {
      email: '',
      password: '',
    },
    validateOnMount: true,
    validationSchema,
  })

  return (
    <div className="flex flex-col h-full justify-center p-12 space-y-6">
      <h1 className="text-3xl">Acesse sua conta</h1>

      <form className="space-y-6" onSubmit={formik.handleSubmit}>

        <div className="space-y-2">
          <Input
            name="email"
            type="text"
            placeholder="E-mail"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disable={formik.isSubmitting}
          />
          {(formik.touched.email && formik.errors.email) && (
            <span className="text-red-500 text-sm">
              {formik.errors.email}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Input
            name="password"
            type="password"
            placeholder="Senha"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disable={formik.isSubmitting}
          />
          {(formik.touched.password && formik.errors.password) && (
            <span className="text-red-500 text-sm">
              {formik.errors.password}
            </span>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-birdBlue py-4 rounded-full disabled:opacity-50 text-lg"
          disabled={!formik.isValid || formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Enviando...' : 'Entrar'}
        </button>
      </form>

      <span className="text-sm text-silver text-center">
        Não tem conta? <a className="text-birdBlue">Inscreva-se</a>
      </span>
    </div>
  )
}