import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'

export default function createDOMElement(virtualDOM) {
  let newElement = null

  // 创建当前对象的 DOM
  if (virtualDOM.type === 'text') {
    // 字符节点
    newElement = document.createTextNode(virtualDOM.props.textContent)
  } else {
    // 元素节点
    newElement = document.createElement(virtualDOM.type)
    // 为 DOM 元素添加 attributes
    updateNodeElement(newElement, virtualDOM)
  }

  // 把 VDOM 挂载到创建出来的 DOM 上
  newElement._virtualDOM = virtualDOM

  virtualDOM.children.forEach((child) => {
    mountElement(child, newElement)
  })

  // 如果用户为 Native Elemnt 设置了 ref 回调函数，则将 DOM 作为参数传递给 ref
  if (virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(newElement)
  }

  return newElement
}
