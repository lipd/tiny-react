import diff from './diff'

export default function render(virtualDOM, container, oldDOM) {
  // 比较新旧节点 => 挂载到 container 上面
  diff(virtualDOM, container, oldDOM)
}
