import mountElement from './mountElement'

export default function diff(virtualDOM, container, oldDOM) {
  if (!oldDOM) {
    // 没有旧节点 => 只用生成 DOM 挂载到 container
    mountElement(virtualDOM, container)
  }
}
