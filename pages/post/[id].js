import React from 'react'
import { useRouter } from 'next/router'

import withAuth from '../../components/hoc/with-auth'
import BaseLayout from '../../components/layout/base-layout'

function PostDetail(props) {
  const router = useRouter()

  return (
    <BaseLayout className="index-content">
      <h1>This is Post {router.query.id}'s detail page!</h1>

      <p>blah blah blah...</p>
      <p>blah blah blah...</p>
      <p>blah blah blah...</p>
    </BaseLayout>
  )
}

export default withAuth(PostDetail)
