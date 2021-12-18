import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'js-cookie'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

import useForm, { SubmitHandler } from '@/hooks/useForm'

import Button from '@/components/atoms/Button'
import SingleColumnLayout from '@/components/atoms/SingleColumnLayout'
import Form from '@/components/form'
import TextInputField from '@/components/form/TextInputField'
import Unauthenticated from '@/components/layouts/Unauthenticated'
import Action from '@/components/molecules/Action'
import Card from '@/components/molecules/Card'

import { EMAIL_REGEXP } from '@/util/const'
import { isMutatationSuccessful } from '@/util/graphql'

type FormValues = {
  email: string
  password: string
}

const Login = () => {
  const router = useRouter()
  const { query } = router

  const {
    clearFormErrors,
    control,
    formErrors,
    handleSubmit,
    setFormError,
  } = useForm<FormValues>({
    criteriaMode: 'all',
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
  })

  // const [{ fetching }, actorLogin] = useActorLogin()

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    async (values) => {
      // const result = await actorLogin(values)

      // clearFormErrors()

      // if (!isMutatationSuccessful(result, { onError: setFormError })) return

      // if (result.data.customerLogin.problem) {
      //   switch (result.data.customerLogin.problem.code) {

      //   }
      //   return
      // }

      // Cookies.set('accessToken', result.data.customerLogin.accessToken!)
      // Cookies.set('refreshToken', result.data.customerLogin.refreshToken!)

      router.push((query.to as string) ?? '/')
    },
    [query]
  )

  return (
    <>
      <Head>
        <title>App login</title>
      </Head>
      <SingleColumnLayout size="2xs">
        <div className="py-8 laptop:py-24">
          <Card title="Login to the app">
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
                  <TextInputField
                    required
                    control={control}
                    fieldId="password"
                    label="Password"
                    autoComplete="current-password"
                    placeholder="Password"
                    rules={{
                      required: {
                        value: true,
                        message: 'Password is required',
                      },
                    }}
                    type="password"
                  />
                </div>
                <div className="flex flex-col items-start gap-4">
                  <Button
                    submit
                    a11yLabel="Submit form"
                    className="w-full"
                    // isLoading={fetching}
                    label="Log in"
                    size="lg"
                  />
                  <Action
                    appearance="plain"
                    action={{
                      a11yLabel: 'Go to forgot password form',
                      label: 'Forgot password?',
                      href: '/forgot-password',
                    }}
                  />
                </div>
              </Form>
            </Card.Section>
            <Card.Section subdued>
              <div className="flex justify-center gap-1">
                <p>Need an account?</p>
                <Action
                  appearance="plain"
                  action={{
                    a11yLabel: 'Go to sign up page',
                    label: 'Sign up here',
                    href: '/signup',
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

Login.applyPersistedLayout = (page: JSX.Element) => {
  return <Unauthenticated>{page}</Unauthenticated>
}

export default Login
