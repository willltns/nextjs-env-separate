import '../styles/about.less'

import React from 'react'
import Link from 'next/link'
import { Empty } from 'antd'

import BaseLayout from '../components/layout/base-layout'

About.getInitialProps = async ctx => {
  return {}
}

export default function About(props) {
  return (
    <BaseLayout className="about-content">
      <h1>This is About page!</h1>

      <nav>
        <Link href="/">
          <a>to index</a>
        </Link>
        <Link href="/post">
          <a>to post</a>
        </Link>
      </nav>

      <Empty className="cus-empty" />
    </BaseLayout>
  )
}
