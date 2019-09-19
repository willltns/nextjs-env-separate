import React from 'react'

export default function Header(props) {
  return (
    <>
      <header>
        <a href="https://github.com/willltns" target="_blank">
          Will Ltns
        </a>
      </header>

      {/* --------------------------------styled-jsx-------------------------------- */}
      {/* language=CSS --- syntax highlighting for webStorm */}
      <style jsx>{`
        header {
          width: 100%;
          padding: 20px;
          background-color: #2b3b5b;
        }

        a {
          color: mediumorchid;
          font-size: 22px;
        }
      `}</style>
    </>
  )
}
