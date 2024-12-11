'use server'

import React from 'react'
import { BaseClientFeatureProps } from '@payloadcms/richtext-lexical'

export type ClientProps = BaseClientFeatureProps<{
  featureKey: string
  order: number
}>

const Button: React.FC<ClientProps> = (props) => {
  console.log('Received props:', props) // Debug semua props yang diterima
  const { featureKey, order } = props

  return (
    <button>
      Feature Key: {featureKey}, Order: {order}
    </button>
  )
}

export default Button
