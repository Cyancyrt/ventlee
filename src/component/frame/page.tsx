import React from 'react'

const IframePage = ({ url }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Embedded Content</h1>
      <iframe
        src={url}
        width="600"
        height="400"
        style={{ border: '1px solid black' }}
        title="Example Iframe"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default IframePage
