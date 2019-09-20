import '../styles/login.less'

import React, { useState, useEffect, useLayoutEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { Button, Input, message } from 'antd'

import BaseLayout from '../components/layout/base-layout'
import RedirectTip from '../components/shared/redirect-tip'

const isServer = typeof window === 'undefined'

Login.getInitialProps = ({ req }) => {
  // If logger in, server-side should render <RedirectTip /> and then continue go back.
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
    // If logged in, continue go back.
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

    // If redirect_path is dynamic route, browser would force refresh because of File-System Routing.
    router.replace(replaceUrl)
    // window.location.replace(replaceUrl) when multiple subdomain or anytime.
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
