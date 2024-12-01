// HighlightButton.tsx
import React from 'react'

export const HighlightButton: React.FC<HighlightButtonProps> = () => {
  return (
    <button
      className={`flex items-center justify-center p-2 rounded-md transition bg-yellow-500 text-white`}
      aria-label="Toggle Highlight"
    >
      <button
        style={{
          background: '#f0f0f0',
          border: '1px solid #ddd',
          padding: '5px 10px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Highlight
      </button>{' '}
    </button>
  )
}
