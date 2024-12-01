'use server'
import React from 'react'

type ClientFeatureProps = {
  featureKey: string
  order: number
}

type FeatureComponentProps = ClientFeatureProps & {
  clientFeatureProps?: ClientFeatureProps | null // Tambahkan props ini
}

const HorizontalRuleComponent: React.FC<FeatureComponentProps> = ({
  featureKey,
  order,
  clientFeatureProps = null, // Pastikan default-nya null jika tidak ada
}) => {
  return (
    <div className="horizontal-rule">
      <span>Feature Key: {featureKey}</span>
      <span>Order: {order}</span>
      <span>Client Feature Props: {JSON.stringify(clientFeatureProps)}</span>
      <hr />
    </div>
  )
}

export default HorizontalRuleComponent
