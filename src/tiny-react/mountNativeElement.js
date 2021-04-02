import createDOMElement from './createDOMElement'
import unmountNode from './unmountNode'

export default function mountNativeElement(virtualDOM, container, oldDOM) {
  const newElement = createDOMElement(virtualDOM)

  // 我们要通过其实现更新，就必须删除旧 DOM
  if (oldDOM) {
    unmountNode(oldDOM)
  }

  container.appendChild(newElement)

  const component = virtualDOM.component

  if (component) {
    component.setDOM(newElement)
  }
}
