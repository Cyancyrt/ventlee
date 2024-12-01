import React from 'react'

// MyNodeComponent will render the content of the node.

export const MyNodeComponent: React.FC<any> = ({
  nodeKey,
  active,
  anchorElem,
  editor,
  enabled,
  item,
}) => {
  return (
    <div className="my-node">
      <p>This is a custom node with key: {nodeKey}</p>
    </div>
  )
}

export default MyNodeComponent
