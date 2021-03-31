import mountElement from './mountElement'

export default function createDOMElement(virtualDOM) {
  let newElement = null
  if (virtualDOM.type === 'text') {
    // 字符节点
    newElement = document.createTextNode(virtualDOM.props.textContent)
  } else {
    // 元素节点
    newElement = document.createElement(virtualDOM.type)
  }

  virtualDOM.children.forEach((child) => {
    mountElement(child, newElement)
  })

  return newElement
}
