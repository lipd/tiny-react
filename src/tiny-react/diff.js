import createDOMElement from './createDOMElement'
import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'
import updateTextNode from './updateTextNode'
import unmountNode from './unmountNode'
import diffComponent from './diffComponent'

export default function diff(virtualDOM, container, oldDOM) {
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

    // 收集所有带 key 属性的元素
    const keyedElements = {}
    for (let domElement of oldDOM.childNodes) {
      if (domElement.nodeType === 1) {
        const key = domElement.getAttribute('key')
        if (key) {
          keyedElements[key] = domElement
        }
      }
    }

    const hasNoKey = Object.keys(keyedElements).length === 0

    // 没有 key => 直接遍历元素进行 diff
    if (hasNoKey) {
      // 递归比较所有子元素
      virtualDOM.children.forEach((child, i) => {
        diff(child, container, oldDOM.childNodes[i])
      })
    }
    // 有 key => 找到有 key 的元素，能找到就不需要重新渲染
    else {
      virtualDOM.children.forEach((child, i) => {
        const key = child.props.key
        if (key) {
          const domElement = keyedElements[key]
          // 能找到元素，不需要重新渲染
          if (domElement) {
            // [1: a, 2: b, 3: c, 4: d] => [2: b, 3: c, 4: d, 1: a]
            // 1. 我们到位置一获取到 key 值 2
            // 2. 我们发现这个位置原来的 a 和 key 值对应的 b 不同
            // 3. 我们把 b 插入到这个位置此时 oldDOM 为 [2: b, 1: a, 3: c, 4: d]
            // oldDOM.childNodes[i]
            // 如果遍历的当前元素
            if (oldDOM.childNodes[i] && oldDOM.childNodes[i] !== domElement) {
              oldDOM.insertBefore(domElement, oldDOM.childNodes[i])
            }
          }
        }
        // 找不到，重新渲染
        else {
        }
      })
    }

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
