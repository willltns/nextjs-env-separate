import '../styles/index.less'

import React from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'

import { initLoadThunk } from '../thunks'

import BaseLayout from '../components/layout/base-layout'

Index.getInitialProps = async ctx => {
  const params = { data: ' need data' }
  await ctx.store.dispatch(initLoadThunk(params))

  return {}
}

export default function Index(props) {
  const loadedData = useSelector(state => state.index.loadedData)
  const initialData = useSelector(state => state.index.initialData)

  console.log('loadedData~', loadedData)
  console.log('initialData~', initialData)

  return (
    <BaseLayout className="index-content">
      <h1>This is Index page!</h1>

      <nav>
        <Link href="/about">
          <a>to about</a>
        </Link>

        <Link href="/protect">
          <a>to protect</a>
        </Link>
      </nav>
    </BaseLayout>
  )
}
