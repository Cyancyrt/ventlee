import { DecoratorNode } from '@payloadcms/richtext-lexical/lexical'
import * as React from 'react'

export class MyNode extends DecoratorNode<React.ReactElement> {
  static getType(): string {
    return 'myNode'
  }

  static clone(node: MyNode): MyNode {
    return new MyNode(node.__key)
  }

  static importJSON(serializedNode) {
    return new MyNode(serializedNode.key)
  }

  exportJSON() {
    return {
      type: 'myNode',
      version: 1,
    }
  }

  createDOM() {
    const element = document.createElement('div')
    element.className = 'my-node-container'
    return element
  }

  decorate() {
    return <div>My Custom Node Content</div>
  }

  isInline() {
    return false
  }

  updateDOM() {
    return false
  }
}

// Utility method to create a new MyNode instance
export function $createMyNode(): MyNode {
  return new MyNode()
}

// Utility method to check if a node is a MyNode
export function $isMyNode(node) {
  return node instanceof MyNode
}
