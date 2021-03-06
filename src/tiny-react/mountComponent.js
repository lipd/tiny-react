import isComponent from './isComponent'
import isFunctionComponent from './isFunctionComponent'
import mountNativeElement from './mountNativeElement'

/**
 * @param {Object} component - 被转化为 VDOM 的组件
 * @param {Object} container - 容器
 * @param {Object} container - 旧元素
 */
export default function mountComponent(component, container, oldDOM) {
  let virtualDOM = null
  let newComponent = null

  // 生成 VDOM
  if (isFunctionComponent(component)) {
    // generate funciton component
    virtualDOM = buildFunctionComponent(component)
  } else {
    // generate class component
    virtualDOM = buildClassComponent(component)
    component = virtualDOM.component // 只有类组件使用这 ref
  }

  // 挂载 VDOM
  if (isComponent(virtualDOM)) {
    // 如果生成的还是组件则向上递归
    mountComponent(virtualDOM, container, oldDOM)
  } else {
    mountNativeElement(virtualDOM, container, oldDOM)
  }

  if (newComponent) {
    // 创建时调用 componentDidMount
    newComponent.componentDidMount()
    if (newComponent.props && newComponent.props.ref) {
      newComponent.props.ref(newComponent)
    }
  }
}

function buildFunctionComponent(component) {
  // 函数组件声明时其接受的参数为 props
  return component.type(component.props || {})
}

function buildClassComponent(component) {
  const componentClass = component.type
  const instance = new componentClass(component.props || {})
  const virtualDOM = instance.render()
  virtualDOM.component = instance
  return virtualDOM
}
