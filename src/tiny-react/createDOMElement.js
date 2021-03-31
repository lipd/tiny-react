import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'

export default function createDOMElement(virtualDOM) {
  let newElement = null
  if (virtualDOM.type === 'text') {
    // 字符节点
    newElement = document.createTextNode(virtualDOM.props.textContent)
  } else {
    // 元素节点
    newElement = document.createElement(virtualDOM.type)
    // 为 DOM 元素添加 attributes
    updateNodeElement(newElement, virtualDOM)
  }

  virtualDOM.children.forEach((child) => {
    mountElement(child, newElement)
  })

  return newElement
}
