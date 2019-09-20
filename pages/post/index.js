import React from 'react'
import Link from 'next/link'

import BaseLayout from '../../components/layout/base-layout'

const postIdList = ['p111', 'p222', 'p333']

export default function Post(props) {
  return (
    <BaseLayout className="index-content">
      <h1>This is Post list page!</h1>

      <ul>
        {postIdList.map(id => (
          <li key={id}>
            <Link href="/post/[id]" as={`/post/${id}`}>
              <a>to post - {id}</a>
            </Link>
          </li>
        ))}
      </ul>
    </BaseLayout>
  )
}
