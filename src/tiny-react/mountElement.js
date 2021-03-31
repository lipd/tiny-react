import isComponent from './isComponent'
import mountNativeElement from './mountNativeElement'
import mountComponent from './mountComponent'

export default function mountElement(virtualDOM, container) {
  // 区分 component 和 native element
  if (isComponent(virtualDOM)) {
    mountComponent(virtualDOM, container)
  } else {
    mountNativeElement(virtualDOM, container)
  }
}
