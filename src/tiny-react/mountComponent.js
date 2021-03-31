import isComponent from './isComponent'
import isFunctionComponent from './isFunctionComponent'
import mountNativeElement from './mountNativeElement'

export default function mountComponent(component, container) {
  let virtualDOM = null

  // 生成 VDOM
  if (isFunctionComponent(component)) {
    // generate funciton component
    virtualDOM = buildFunctionComponent(component)
  } else {
    // generate class component
  }

  // 挂载 VDOM
  if (isComponent(virtualDOM)) {
    // 如果还是生成的还是组件则向上递归
    mountComponent(virtualDOM, container)
  } else {
    mountNativeElement(virtualDOM, container)
  }
}

function buildFunctionComponent(component) {
  // 函数组件声明时其接受的参数为 props
  return component.type(component.props || {})
}
