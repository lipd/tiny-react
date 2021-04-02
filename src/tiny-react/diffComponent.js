import mountElement from './mountElement'

export default function diffComponent(
  virtualDOM,
  oldComponent,
  oldDOM,
  container,
) {
  if (isSameComponent(virtualDOM, oldComponent)) {
    // 是同一个组件的情况暂时不处理
  } else {
    // 不是同一个组件 => 直接把新元素挂载到容器

    // mountElemnt 之前只有挂载的功能
    // 我们要求它如果新元素是组件，则需要卸载旧元素
    mountElement(virtualDOM, container, oldDOM)
  }
}

function isSameComponent(virtualDOM, oldComponent) {
  return oldComponent && virtualDOM.type === oldComponent.constructor
}
