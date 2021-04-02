import isComponent from './isComponent'
import mountNativeElement from './mountNativeElement'
import mountComponent from './mountComponent'

export default function mountElement(virtualDOM, container, oldDOM) {
  // 区分 component 和 native element
  if (isComponent(virtualDOM)) {
    mountComponent(virtualDOM, container, oldDOM)
  } else {
    // virtualDOM 如果是 Native Element，则删除原有元素，挂载组件
    mountNativeElement(virtualDOM, container, oldDOM)
  }
}
