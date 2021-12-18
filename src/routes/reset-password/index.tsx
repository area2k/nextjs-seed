import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

import { UserResetPasswordProblemCode } from '@/graphql/enums'

import useForm, { SubmitHandler } from '@/hooks/useForm'

import Button from '@/components/atoms/Button'
import SingleColumnLayout from '@/components/atoms/SingleColumnLayout'
import Form from '@/components/form'
import TextInputField from '@/components/form/TextInputField'
import Unauthenticated from '@/components/layouts/Unauthenticated'
import Action from '@/components/molecules/Action'
import Card from '@/components/molecules/Card'

import { isMutatationSuccessful } from '@/util/graphql'

import { useResetPasswordMutation } from './__generated__/ResetPassword'

type FormValues = {
  confirmPassword: string
  password: string
}

const ResetPassword = () => {
  const router = useRouter()
  const { query } = router

  const [token, setToken] = useState<string | null>(null)
  const [didReset, setDidReset] = useState(false)

  const {
    clearFormErrors,
    control,
    formErrors,
    handleSubmit,
    setFormError,
    watch,
  } = useForm<FormValues>({
    criteriaMode: 'all',
    defaultValues: { confirmPassword: '', password: '' },
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  })

  const [{ fetching }, resetPassword] = useResetPasswordMutation()

  useEffect(() => {
    if (!router.isReady) return

    if (typeof query.token !== 'string') {
      router.push('/login')
    } else {
      setToken(query.token)
    }
  }, [router.isReady, query.token])

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    async ({ password }) => {
      const result = await resetPassword({ password, token: token! })

      clearFormErrors()

      if (!isMutatationSuccessful(result, { onError: setFormError })) return

      if (result.data.userResetPassword.problem) {
        switch (result.data.userResetPassword.problem.code) {
          case UserResetPasswordProblemCode.InvalidToken:
            setFormError(UserResetPasswordProblemCode.InvalidToken, {
              icon: faExclamationTriangle,
              message: 'Invalid reset token.',
            })
        }
        return
      }

      setDidReset(true)
    },
    [token]
  )

  return (
    <>
      <Head>
        <title>App / Password reset</title>
      </Head>
      <SingleColumnLayout size="2xs">
        <div className="py-8 laptop:py-24">
          {didReset ? (
            <Card
              sectioned
              subtitle="Your new password has been saved."
              title="Password reset!"
            >
              <Action
                action={{
                  a11yLabel: 'Go to login page',
                  label: 'Back to login',
                  href: '/login',
                }}
                size="lg"
                style={{ display: 'flex', width: '100%' }}
              />
            </Card>
          ) : (
            <Card
              subtitle="Set a new password for your account."
              title="Reset password"
            >
              <Card.Section>
                <Form
                  errors={formErrors}
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                >
                  <div className="pb-6">
                    <TextInputField
                      required
                      control={control}
                      fieldId="password"
                      label="Password"
                      autoComplete="new-password"
                      placeholder="Password"
                      rules={{
                        required: {
                          value: true,
                          message: 'Password is required',
                        },
                        minLength: {
                          value: 8,
                          message:
                            'Please enter a password of at least 8 characters',
                        },
                      }}
                      type="password"
                    />
                    <TextInputField
                      required
                      control={control}
                      fieldId="confirmPassword"
                      label="Confirm password"
                      autoComplete="new-password"
                      placeholder="Confirm password"
                      rules={{
                        required: {
                          value: true,
                          message: 'Password confirmation is required',
                        },
                        validate: (value) =>
                          value === watch('password')
                            ? true
                            : 'Passwords do not match',
                      }}
                      type="password"
                    />
                  </div>
                  <Button
                    submit
                    a11yLabel="Submit form"
                    className="w-full"
                    isLoading={fetching}
                    label="Reset password"
                    size="lg"
                  />
                </Form>
              </Card.Section>
            </Card>
          )}
        </div>
      </SingleColumnLayout>
    </>
  )
}

ResetPassword.applyPersistedLayout = (page: JSX.Element) => {
  return <Unauthenticated>{page}</Unauthenticated>
}

export default ResetPassword
