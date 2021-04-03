export default function unmountNode(node) {
  const virtualDOM = node._virtualDOM

  if (virtualDOM.type === 'text') {
    node.remove()
    return
  }

  // 删除组件节点
  const component = virtualDOM.component
  if (component) {
    // 触发生命周期
    component.componentWillUnmount()
  }

  // 是否有 ref 函数，有的话删掉
  if (virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(null)
  }

  // 删除事件的监听器
  Object.keys(virtualDOM.props).forEach((propName) => {
    if (propName.slice(0, 2) === 'on') {
      const eventName = propName.toLowerCase().slice(2)
      const eventHandler = virtualDOM.propName[propName]
      node.removeEventListener(eventName, eventHandler)
    }
  })

  // 递归删除子节点
  if (node.childNodes.length > 0) {
    for (let i = 0; i < node.childNodes.length; i++) {
      unmountNode(node.childNodes[i])
      i--
    }
  }

  // 删除当前节点
  node.remove()
}
