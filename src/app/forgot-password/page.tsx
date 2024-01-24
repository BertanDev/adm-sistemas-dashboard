'use client'

import { api } from '@/lib/axios/initAxios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Toaster, toast } from 'react-hot-toast'

const recoverFormSchema = z.object({
  email: z.string().min(1, { message: 'Informe seu email' }),
  password: z
    .string()
    .min(8, { message: 'A senha deve conter ao menos 8 caracteres' }),
  confirmPassword: z
    .string()
    .min(8, { message: 'A senha deve conter ao menos 8 caracteres' }),
})

type RecoverFormData = z.infer<typeof recoverFormSchema>

export default function ForgotPassword() {
  const recoverForm = useForm<RecoverFormData>({
    resolver: zodResolver(recoverFormSchema),
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = recoverForm

  async function handleRecover(data: RecoverFormData) {
    const { email, password, confirmPassword } = data

    if (password !== confirmPassword) {
      toast.error('As senhas devem sem iguais')
      return
    }

    try {
      await api.post('/recover-password', {
        email,
        password,
        confirm_password: confirmPassword,
      })

      toast.success(`Email de recuperação enviado para ${email}`, {
        duration: 5000,
      })
    } catch {
      toast.error('Não foi possivel recuperar a senha')
    }
  }

  return (
    <>
      <Toaster />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <span className="flex items-center mb-6 text-2xl font-semibold text-gray-800 dark:text-white">
            ADM Analitycs
          </span>
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-700 md:text-2xl dark:text-white">
              Alterar senha
            </h2>
            <form
              onSubmit={handleSubmit(handleRecover)}
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              action="#"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-800"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    placeholder="email@email.com.br"
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    {...register('email')}
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-blue-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-800"
                  >
                    Senha
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    placeholder="********"
                    autoComplete="current-password"
                    required
                    {...register('password')}
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-blue-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-800"
                  >
                    Confirme sua senha
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    type="password"
                    placeholder="********"
                    required
                    {...register('confirmPassword')}
                    className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-blue-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="flex items-start"></div>
              <button
                disabled={isSubmitting}
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                {isSubmitting ? 'Carregando' : 'Recuperar Senha'}
              </button>

              <p className="mt-10 text-center text-sm text-gray-500">
                <a
                  href="/"
                  className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
                >
                  Voltar para login
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
