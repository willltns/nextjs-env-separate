import '../styles/base.less'

import App from 'next/app'
import Head from 'next/head'
import React from 'react'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'

import configureStore from '../config/configure-store'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps, store } = this.props

    return (
      <ConfigProvider locale={zhCN}>
        <Head>
          {process.env.NODE_ENV === 'production' && (
            <script
              type="text/javascript"
              src={`/_next/static/chunks/${require('../assets/dll/assets.json').vendor.js}`}
            />
          )}
        </Head>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ConfigProvider>
    )
  }
}

export default withRedux(configureStore)(MyApp)
