import mountNativeElement from './mountNativeElement'

export default function mountElement(virtualDOM, container) {
  // 区分 component 和 native element
  mountNativeElement(virtualDOM, container)
}
