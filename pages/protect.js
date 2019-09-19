import React from 'react'
import Warning from '../assets/svg/Warning.svg'

import withAuth from '../components/hoc/with-auth'
import BaseLayout from '../components/layout/base-layout'

function Protect(props) {
  const iconData = 25

  return (
    <>
      <BaseLayout>
        <h1>
          Protected page
          <Warning className="warning-icon" />
        </h1>
      </BaseLayout>

      {/* --------------------------------styled-jsx-------------------------------- */}
      {/* language=CSS --- syntax highlighting for webStorm */}
      <style jsx>{`
        h1 {
          display: flex;
          align-items: center;
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

export default withAuth(Protect)
