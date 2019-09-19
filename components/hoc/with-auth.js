import React from 'react'

export default Component =>
  class withAuth extends React.Component {
    static async getInitialProps(args) {
      let pageProps = {}
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(args)
      }

      return { ...pageProps }
    }

    render() {
      // TODO verify authentication

      return <Component {...this.props} />
    }
  }
