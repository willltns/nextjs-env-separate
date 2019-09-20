import React from 'react'
import Link from 'next/link'

import Warning from '../assets/svg/Warning.svg'

import withAuth from '../components/hoc/with-auth'
import BaseLayout from '../components/layout/base-layout'

function Secret(props) {
  const iconData = 25

  return (
    <>
      <BaseLayout>
        <h1>
          Secret page
          <Warning className="warning-icon" />
        </h1>

        <nav>
          <Link href="/protect">
            <a>to protect</a>
          </Link>

          <Link href="/">
            <a>to index</a>
          </Link>
        </nav>
      </BaseLayout>

      {/* --------------------------------styled-jsx-------------------------------- */}
      {/* language=CSS --- syntax highlighting for webStorm */}
      <style jsx>{`
        h1 {
          display: flex;
          align-items: center;
        }

        h1 + nav > a:first-of-type {
          margin-right: 50px;
        }
      `}</style>

      <style global jsx>{`
        .warning-icon {
          width: ${iconData}px;
          height: ${iconData}px;
          margin-left: ${iconData - 20}px;
        }
      `}</style>
    </>
  )
}

export default withAuth(Secret)
