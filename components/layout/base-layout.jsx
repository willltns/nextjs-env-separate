import React from 'react'

import Header from '../shared/header'

export default function BaseLayout(props) {
  const { className = '', children } = props

  return (
    <>
      <div className="layout-container">
        <Header />
        <main className={className}>{children}</main>
      </div>

      {/* --------------------------------styled-jsx-------------------------------- */}
      {/* language=CSS --- syntax highlighting for webStorm */}
      <style jsx>{`
        main {
          padding: 16px;
        }
      `}</style>
    </>
  )
}
