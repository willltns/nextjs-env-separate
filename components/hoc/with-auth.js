import React, { useLayoutEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

import { stringifyRouterQuery } from '../../utils'

import RedirectTip from '../shared/redirect-tip'

const isServer = typeof window === 'undefined'

const clientAuth = router => {
  if (Cookies.get('jwt')) return
  const { asPath, pathname, query } = router
  const tempQuery = { ...query }

  // When routing dynamic routing like '/post/[id]',
  // avoiding repeated dynamic value 'id' param added to href's queryString.
  const asRegx = /\[(\w*)\]/g
  let regxRes = null
  while ((regxRes = asRegx.exec(pathname))) delete tempQuery[regxRes[1]]
  const search = stringifyRouterQuery(tempQuery)

  const replaceUrl = `/login?redirect_path=${encodeURIComponent(asPath + search)}`
  router.replace(replaceUrl)
}

const serverAuth = (req, res) => {
  if (req && !req.cookies.jwt) {
    const { path, query } = req
    const search = stringifyRouterQuery(query)
    const replaceUrl = `/login?redirect_path=${encodeURIComponent(path + search)}`

    res.writeHead(302, { Location: replaceUrl })
    res.end()
  }
}

export default Component => {
  WithAuth.getInitialProps = async args => {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(args)
    }

    isServer && serverAuth(args.req, args.res)

    return { ...pageProps }
  }

  function WithAuth(props) {
    const router = useRouter()

    // useLayoutEffect does nothing on the server.
    useLayoutEffect(() => {
      if (isServer) return
      clientAuth(router)
    }, [])

    if (!isServer && !Cookies.get('jwt')) return <RedirectTip />

    return <Component {...props} />
  }

  return WithAuth
}
