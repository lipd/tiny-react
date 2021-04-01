import diff from './diff'

// 因为 react 要求每个组件都有一个最外围的父节点, 所以 oldDOM 在 container 的第一个子节点
export default function render(
  virtualDOM,
  container,
  oldDOM = container.firstChild,
) {
  // 比较新旧节点 => 挂载到 container 上面
  diff(virtualDOM, container, oldDOM) // 当挂载到一个空节点时，container.firstChild 为空
}
