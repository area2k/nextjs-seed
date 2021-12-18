import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Head from 'next/head'
import { useCallback, useState } from 'react'

import useForm, { SubmitHandler } from '@/hooks/useForm'

import Alert from '@/components/atoms/Alert'
import Button from '@/components/atoms/Button'
import FormElement from '@/components/atoms/FormElement'
import SingleColumnLayout from '@/components/atoms/SingleColumnLayout'
import Form from '@/components/form'
import TextInputField from '@/components/form/TextInputField'
import Unauthenticated from '@/components/layouts/Unauthenticated'
import Action from '@/components/molecules/Action'
import Card from '@/components/molecules/Card'

import { EMAIL_REGEXP } from '@/util/const'
import { isMutatationSuccessful } from '@/util/graphql'

import { useForgotPasswordMutation } from './__generated__/ForgotPassword'

type FormValues = {
  email: string
}

const ForgotPassword = () => {
  const [didSubmit, setDidSubmit] = useState(false)

  const {
    clearFormErrors,
    control,
    formErrors,
    handleSubmit,
    setFormError,
    reset: resetForm,
  } = useForm<FormValues>({
    criteriaMode: 'all',
    defaultValues: { email: '' },
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  })

  const [{ fetching }, forgotPassword] = useForgotPasswordMutation()

  const onSubmit: SubmitHandler<FormValues> = useCallback(async (values) => {
    const result = await forgotPassword(values)

    clearFormErrors()

    if (!isMutatationSuccessful(result, { onError: setFormError })) return

    resetForm()
    setDidSubmit(true)
  }, [])

  return (
    <>
      <Head>
        <title>App / Forgot password</title>
      </Head>
      <SingleColumnLayout size="2xs">
        <div className="py-8 laptop:py-24">
          <Card
            subtitle="Send a reset link to your email address"
            title="Forgot password?"
          >
            <Card.Section>
              <Form
                errors={formErrors}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
              >
                <div className="pb-6">
                  {didSubmit && (
                    <FormElement>
                      <Alert
                        icon={faCheckCircle}
                        message="Check your email for a reset link."
                        status="success"
                      />
                    </FormElement>
                  )}
                  <TextInputField
                    required
                    control={control}
                    fieldId="email"
                    label="Email"
                    autoComplete="email"
                    placeholder="Email address"
                    rules={{
                      required: {
                        value: true,
                        message: 'Email address is required',
                      },
                      pattern: {
                        value: EMAIL_REGEXP,
                        message: 'Invalid email address',
                      },
                    }}
                    type="email"
                  />
                </div>
                <Button
                  submit
                  a11yLabel="Submit form"
                  className="w-full"
                  isLoading={fetching}
                  label="Send reset email"
                  size="lg"
                />
              </Form>
            </Card.Section>
            <Card.Section subdued>
              <div className="flex justify-center">
                <Action
                  appearance="plain"
                  action={{
                    a11yLabel: 'Go to log in page',
                    label: 'Return to log in',
                    href: '/login',
                  }}
                />
              </div>
            </Card.Section>
          </Card>
        </div>
      </SingleColumnLayout>
    </>
  )
}

ForgotPassword.applyPersistedLayout = (page: JSX.Element) => {
  return <Unauthenticated>{page}</Unauthenticated>
}

export default ForgotPassword
