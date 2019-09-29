import '../styles/login.less'

import React, { useState, useLayoutEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { Button, Input, message } from 'antd'

import BaseLayout from '../components/layout/base-layout'
import RedirectTip from '../components/shared/redirect-tip'

const isServer = typeof window === 'undefined'

Login.getInitialProps = ({ req }) => {
  // If logger in, in order to prevent inconsistent flash,
  // server-side need render <RedirectTip /> and then continue go back.
  if (req && req.cookies.jwt) return { loggedIn: true }
  return {}
}

export default function Login(props) {
  const router = useRouter()
  const [psw, setPsw] = useState('')
  const { loggedIn } = props

  // useLayoutEffect does nothing on the server.
  useLayoutEffect(() => {
    if (isServer) return

    // If logged in, user should not log in again, go back or to index page.
    Cookies.get('jwt') && router.back()
  }, [])

  const login = e => {
    e.preventDefault()

    // blah blah blah...
    if (psw !== '123') {
      message.warn('Please input password: 123 !')
      return
    }
    // Simulating login succeeded
    Cookies.set('jwt', 'JJ.WW.TT')
    const { redirect_path } = router.query
    const replaceUrl = redirect_path ? decodeURIComponent(redirect_path) : '/'

    // I figured out three ways to redirect back to previous protected page.

    // 1.
    router.replace(replaceUrl)

    // 2.
    // If redirect_path is a dynamic route,
    // browser would force refresh because of File-System Routing.
    // This kind of situation may be avoided by using hidden controlled <Link>:
    //
    //   <Link href={state.href} as={state.as} replace>
    //     <a ref={linkRef} style={{ display: 'none' }}>hidden controlled redirect link</a>
    //   </Link>
    //
    // linkRef.current.click()

    // 3.
    // When multiple subdomain or something else....
    // window.location.replace(replaceUrl)
  }

  if (loggedIn || (!isServer && Cookies.get('jwt'))) return <RedirectTip />

  return (
    <BaseLayout className="login-content">
      <h1>This is Login page!</h1>

      <form onSubmit={login}>
        <Input.Password
          value={psw}
          autoFocus
          autoComplete="123"
          className="input-psw"
          placeholder="password: 123"
          onChange={e => setPsw(e.target.value)}
        />
        <Button type="primary" htmlType="submit">
          login
        </Button>
      </form>
    </BaseLayout>
  )
}
