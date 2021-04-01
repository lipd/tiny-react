import mountElement from './mountElement'
import updateTextNode from './updateTextNode'

export default function diff(virtualDOM, container, oldDOM) {
  // 我们希望通过 DOM 的 _virtualDOM 属性访问到它的 VDOM
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM

  // 没有旧节点 => 只用生成 DOM 挂载到 container
  if (!oldDOM) {
    mountElement(virtualDOM, container)
  }

  // 新旧节点类型相同时
  else if (oldVirtualDOM && virtualDOM.type == oldVirtualDOM.type) {
    if (virtualDOM.type === 'text') {
      // update text content
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // update attribute
    }

    // 递归比较所有子元素
    virtualDOM.children.forEach((child, i) => {
      diff(child, container, oldDOM.childNodes[i])
    })
  }
}
