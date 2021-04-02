import createDOMElement from './createDOMElement'
import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'
import updateTextNode from './updateTextNode'
import unmountNode from './unmountNode'
import diffComponent from './diffComponent'

export default function diff(virtualDOM, container, oldDOM) {
  console.log(virtualDOM, container, oldDOM)
  // 我们希望通过 DOM 的 _virtualDOM 属性访问到它的 VDOM
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
  const oldComponent = oldVirtualDOM && oldVirtualDOM.component

  // 没有旧节点 => 只用生成 DOM 挂载到 container
  if (!oldDOM) {
    mountElement(virtualDOM, container)
  }

  // 新元素是组件的情况全部交给 diffComponent
  else if (typeof virtualDOM.type === 'function') {
    diffComponent(virtualDOM, oldComponent, oldDOM, container)
  }

  // 节点类型不同 => 用新的 VDOM 生成 DOM 换上去即可
  else if (
    virtualDOM.type !== oldVirtualDOM.type &&
    typeof virtualDOM !== 'function'
  ) {
    const newElement = createDOMElement(virtualDOM)
    oldDOM.parentNode.replaceChild(newElement, oldDOM)
  }

  // 新旧节点类型相同时
  else if (oldVirtualDOM && virtualDOM.type == oldVirtualDOM.type) {
    if (virtualDOM.type === 'text') {
      // update text content
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // update attribute
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
    }

    // 递归比较所有子元素
    virtualDOM.children.forEach((child, i) => {
      diff(child, container, oldDOM.childNodes[i])
    })

    if (oldDOM.childNodes.length > virtualDOM.children.length) {
      // 数量不同则从后往前删到相同
      const oldLen = oldDOM.childNodes.length
      const newLen = virtualDOM.children.length
      for (let i = oldLen - 1; i > newLen - 1; i--) {
        unmountNode(oldDOM.childNodes[i])
      }
    }
  }
}
