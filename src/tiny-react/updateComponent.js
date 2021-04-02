import diff from './diff'

export default function updateComponent(
  virtualDOM,
  oldComponent,
  oldDOM,
  container,
) {
  // 更新时首先调用 componentWillReceiveProps() => 进入更新流程
  oldComponent.componentWillReceiveProps(virtualDOM.props)
  // 然后调用 shoudComponentUpdate 决定是否更新
  if (oldComponent.shouldComponentUpdate(virtualDOM.props)) {
    const prevProps = oldComponent.props
    // componentWillUpdate 和 componentWillReceiveProps 的区别只有经历是否更新的判断
    oldComponent.componentWillUpdate(virtualDOM.props)
    // 组件更新
    // 调用 updateProps 方法，更新 this 上的 props
    oldComponent.updateProps(virtualDOM.props)
    // 返回最新的 VM
    const nextVirtualDOM = oldComponent.render()
    nextVirtualDOM.component = oldComponent

    // 执行 diff 算法更新 DOM
    diff(nextVirtualDOM, container, oldDOM)
    // 执行 componentDidUpdate
    oldComponent.componentDidUpdate(prevProps)
  }
}
